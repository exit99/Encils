from django.contrib.auth.models import AbstractUser
from django.core.validators import (
    MaxValueValidator,
    MinValueValidator,
    RegexValidator,
)
from django.db import models

from sms.manager import TeacherManager


PHONE_REGEX = RegexValidator(
    regex=r'^\d{11,16}$',
    message="Phone number must be entered in the format: '999999999'. Up to 16 digits allowed."
)

ATTENDANCE_STATUS_CHOICES = (
    ("present", "present"),
    ("tardy", "tardy"),
    ("absent", "absent"),
)


class Teacher(AbstractUser):
    username = None
    email = models.EmailField(blank=True, unique=True)
    sms = models.CharField(max_length=16, validators=[PHONE_REGEX], blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = TeacherManager()

    def __str__(self):
        return self.email

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email

    @property
    def student_set(self):
        classrooms = self.classroom_set.all().values_list("pk")
        return Student.objects.filter(classroom__in=classrooms)

    @property
    def question_set(self):
        assignments = self.assignment_set.all().values_list("pk")
        return Question.objects.filter(assignment__in=assignments)

    @property
    def answer_set(self):
        questions = self.question_set.all().values_list("pk")
        return Answer.objects.filter(question__in=questions)


class Classroom(models.Model):
    teacher = models.ForeignKey(Teacher)
    name = models.CharField(max_length=50)
    school = models.CharField(max_length=50)
    created = models.DateTimeField(auto_now_add=True)

    def activate(self):
        active_item, _ = ActiveItem.objects.get_or_create(teacher=self.teacher)
        active_item.classroom = self
        active_item.save()

    def deactivate(self):
        active_item, _ = ActiveItem.objects.get_or_create(teacher=self.teacher)
        if active_item.classroom == self:
            active_item.classroom = None
            active_item.save()


class Student(models.Model):
    classroom = models.ForeignKey(Classroom)
    name = models.CharField(max_length=50)
    phone = models.CharField(max_length=16, validators=[PHONE_REGEX])
    created = models.DateTimeField(auto_now_add=True)

    @property
    def teacher(self):
        return self.classroom.teacher

    @property
    def attendance(self):
        data = {}
        for attendance in self.attendance_set.all():
            data.setdefault(attendance.status, 0)
            data[attendance.status] += 1
        return data


class Attendance(models.Model):
    student = models.ForeignKey(Student)
    classroom = models.ForeignKey(Classroom)
    date = models.DateField()
    status = models.CharField(max_length=7, choices=ATTENDANCE_STATUS_CHOICES, default="absent")

    @property
    def teacher(self):
        return self.classroom.teacher


class Assignment(models.Model):
    teacher = models.ForeignKey(Teacher)
    name = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)


class Question(models.Model):
    assignment = models.ForeignKey(Assignment)
    text = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)

    @property
    def teacher(self):
        return self.assignment.teacher

    def activate(self):
        active_item, _ = ActiveItem.objects.get_or_create(teacher=self.teacher)
        active_item.question = self
        active_item.save()

    def deactivate(self):
        active_item, _ = ActiveItem.objects.get_or_create(teacher=self.teacher)
        if active_item.question == self:
            active_item.question = None
            active_item.save()


class Answer(models.Model):
    student = models.ForeignKey(Student)
    question = models.ForeignKey(Question)
    classroom = models.ForeignKey(Classroom)
    text = models.CharField(max_length=160)
    grade = models.IntegerField(null=True, blank=True, validators=[MaxValueValidator(3), MinValueValidator(0)])
    created = models.DateTimeField(auto_now_add=True)

    @property
    def assignment(self):
        return self.question.assignment

    @property
    def teacher(self):
        return self.classroom.teacher


class ActiveItem(models.Model):
    teacher = models.OneToOneField(Teacher)
    classroom = models.ForeignKey(Classroom, null=True, default=None)
    question = models.ForeignKey(Question, null=True, default=None)

    def add_students(self, classroom):
        self.classroom = classroom
        self.save()

    def add_answers(self, question):
        self.classroom = question.assignment.classroom
        self.question = question
        self.save()

    def reset(self):
        self.classroom = None
        self.question = None
        self.save()

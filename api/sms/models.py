from datetime import datetime
from statistics import mean

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

    @property
    def assignments_given(self):
        return set([a.pk for a in self.assignments])

    @property
    def assignments(self):
        return set([a.question.assignment for a in self.answer_set.all()])

    @property
    def questions(self):
        return set([a.question for a in self.answer_set.all()])

    @property
    def gpa(self):
        grades = [a.grade for a in self.answer_set.all() if a.grade]
        return round(mean(grades) if grades else 0, 0)

    @property
    def answer_rate(self):
        max_answers = self.student_set.count() * len(self.questions)
        if max_answers:
            return round(self.answer_set.count() / max_answers * 100, 0)
        return 0

    @property
    def students(self):
        return [s.pk for s in Student.objects.filter(classroom=self).all()]

    @property
    def assignments_needing_grading(self):
        Assignment.obje


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

    @property
    def grade(self):
        answers = Answer.objects.filter(
            ~models.Q(grade=None), student=self, classroom=self.classroom
        ).values('grade')
        grades = [answer['grade'] for answer in answers]
        return round(mean(grades) if grades else 0, 0)
        

class Attendance(models.Model):
    student = models.ForeignKey(Student)
    classroom = models.ForeignKey(Classroom)
    date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=7, choices=ATTENDANCE_STATUS_CHOICES, default="present")

    @property
    def teacher(self):
        return self.classroom.teacher

    @classmethod
    def attendance_today(cls, classroom):
        from sms.serializers import AttendanceSerializer
        data = []
        for student in classroom.student_set.all():
            obj, _ = Attendance.objects.get_or_create(classroom=classroom, student=student)
            data.append(AttendanceSerializer(obj).data)
        return data 


class Assignment(models.Model):
    teacher = models.ForeignKey(Teacher)
    name = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    hide_answers = models.BooleanField(default=False)
    one_at_a_time = models.BooleanField(default=False)

    @property
    def question_count(self):
        return Question.objects.filter(assignment=self).count()


class Question(models.Model):
    assignment = models.ForeignKey(Assignment)
    text = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)

    @property
    def teacher(self):
        return self.assignment.teacher

    @property
    def grade(self):
        answers = Answer.objects.filter(question=self).values('grade')
        grades = [answer['grade'] for answer in answers]
        return round(mean(grades) if grades else 0, 0)


class Answer(models.Model):
    student = models.ForeignKey(Student)
    question = models.ForeignKey(Question)
    classroom = models.ForeignKey(Classroom)
    text = models.CharField(max_length=160)
    grade = models.IntegerField(null=True, blank=True, validators=[MaxValueValidator(100), MinValueValidator(0)])
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

    def activate_classroom(self, classroom):
        if isinstance(classroom, int):
            classroom = Classroom.objects.filter(pk=classroom).first()
        self.classroom = classroom
        self.question = None
        self.save()

    def activate_question(self, question):
        if isinstance(question, int):
            question = Question.objects.filter(pk=question).first()
        self.question = question
        self.save()

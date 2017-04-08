from collections import OrderedDict

from jsonfield import JSONField

from django.conf import settings
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.dispatch import receiver
from django.db import models
from django.db.models.signals import post_save
from django.utils import timezone

from sms.consumers import send_object_as_message
from sms.serializers import StudentSerializer


class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    sms_number = models.CharField(max_length=20, null=True, blank=True)
    active_model = models.CharField(max_length=20, null=True, blank=True)
    active_model_pk = models.IntegerField(null=True, blank=True)
    active_classroom = models.ForeignKey('Classroom', null=True, blank=True)

    def set_active(self, model):
        self.active_model = model.__class__.__name__
        self.active_model_pk = model.pk

    @property
    def model(self):
        models = {"Classroom": Classroom, "Question": Question}
        if self.active_model and self.active_model_pk:
            return models[self.active_model].objects.get(pk=self.active_model_pk)

    def deactivate_all(self):
        self.active_classroom = self.active_model = self.active_classroom = None
        self.save()

    def save(self, *args, **kwargs):
        if settings.DEBUG:
            self.sms_number = settings.SIMULATED_SMS["to"]
        return super(Teacher, self).save(*args, **kwargs)


class Classroom(models.Model):
    name = models.CharField(max_length=50)
    school = models.CharField(max_length=50)
    user = models.ForeignKey(User)
    created = models.DateTimeField(auto_now_add=True)

    @property
    def attendance_taken(self):
        return Attendance.objects.filter(
            date=timezone.now(), classroom=self).exists()


class Student(models.Model):
    name = models.CharField(max_length=50)
    phone = models.CharField(max_length=20)
    classroom = models.ForeignKey(Classroom)
    created = models.DateTimeField(auto_now_add=True)

    def render(self):
        return {"pk": self.pk, "name": self.name, "phone": self.phone}


class Assignment(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User)


class Question(models.Model):
    question = models.CharField(max_length=255)
    assignment = models.ForeignKey(Assignment)
    active = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)


class Answer(models.Model):
    text = models.CharField(null=True, blank=True, max_length=50)
    grade = models.IntegerField(null=True, blank=True, validators=[MaxValueValidator(3), MinValueValidator(0)])
    student = models.ForeignKey(Student)
    question = models.ForeignKey(Question)
    created = models.DateTimeField(auto_now_add=True)

    @property
    def assignment(self):
        return self.question.assignment


class Attendance(models.Model):
    classroom = models.ForeignKey(Classroom)
    date = models.DateField(Classroom)
    attendance = JSONField(load_kwargs={'object_pairs_hook': OrderedDict})

    def save(self, *args, **kwargs):
        if self.pk is None:
            self.date = timezone.now()
        return super(Attendance, self).save(*args, **kwargs)


@receiver(post_save, sender=Student, dispatch_uid="student_updated")
def student_updated(sender, student, **kwargs):
    send_object_as_message(student, StudentSerializer)

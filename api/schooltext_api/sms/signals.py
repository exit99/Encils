from django.db.models.signals import post_save
from django.dispatch import receiver

from sms.consumers import send_teachers_obj_as_message
from sms.models import Answer, Student
from sms.serializers import AnswerSerializer, StudentSerializer


@receiver(post_save, sender=Student, dispatch_uid="student_updated")
def student_updated(instance, **kwargs):
    send_teachers_obj_as_message(instance, StudentSerializer)


@receiver(post_save, sender=Answer, dispatch_uid="answer_updated")
def answer_updated(instance, **kwargs):
    send_teachers_obj_as_message(instance, AnswerSerializer)

from django.conf import settings
from profanity import profanity

from sms.models import Student, Teacher


class SMSMessage(object):
    def __init__(self, sms=None):
        sms = sms or SMSMessage._default()
        self.phone = sms['msisdn']
        self.type = sms['type']
        self.text = sms['text']
        self.teacher = Teacher.objects.filter(sms=sms['to']).first()
        self.student = Student.objects.filter(phone=self.phone).first()
        self.active_item = self.teacher.active_item
        self.classroom =self.active_item.classroom
        self.question = self.active_item.question

    def execute(self):
        if self.question and self.classroom and self.student:
            return self.create_answer()
        elif self.active_item.classroom:
            return self.create_student()

    def create_answer():
        return Answer.objects.create(
            question=self.question,
            classroom=self.classroom,
            student=self.student, 
            text=self.text,
        )

    def create_student():
        return Student.objects.create(
            classroom=self.classroom,
            name=self.text,
            phone=self.phone,
        )

    @staticmethod
    def _default():
        data = {
            "keyword": "THIS",
            "msisdn": "18137660689",
            "text": "The study of the earth",
            "to": "18133893559",
            "message-timestamp": "2017-03-12 00:43:33",
            "messageId": "0B0000003B7C8DE8",
            "type": "text"
        }
        data.update(getattr(settings, 'SIMULATED_SMS', {}))
        return data 

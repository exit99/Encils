from django.conf import settings
from profanity import profanity

from sms.models import Student, Teacher, Answer


class SMSMessage(object):
    def __init__(self, sms=None):
        sms = sms or SMSMessage._default()
        self.phone = sms['msisdn']
        self.type = sms['type']
        self.text = sms['text']
        self.teacher = Teacher.objects.filter(sms=sms['to']).first()
        activeitem = getattr(self.teacher, 'activeitem', None)
        self.classroom = activeitem.classroom if activeitem else None
        self.question = activeitem.question if activeitem else None
        self.student = Student.objects.filter(
            classroom=self.classroom, phone=self.phone).first()

    def execute(self):
        if self.question and self.classroom and self.student:
            print("CREATE ANSWEE")
            return self.create_or_update_answer()
        elif self.classroom:
            print("UPDATE STUDENTS")
            return self.create_or_update_student()

    def create_or_update_answer(self):
        answer, _ = Answer.objects.get_or_create(
            question=self.question,
            classroom=self.classroom,
            student=self.student, 
        )
        answer.text = self.text
        answer.save()

    def create_or_update_student(self):
        student, _ = Student.objects.get_or_create(
            classroom=self.classroom,
            phone=self.phone,
        )
        student.name = self.text
        student.save()

    @staticmethod
    def _default():
        data = {
            "keyword": "THIS",
            "msisdn": "18137684282",
            "text": "I heard there was a secret cord, that david played.",
            "to": "13232022665",
            "message-timestamp": "2017-03-12 00:43:33",
            "messageId": "0B0000003B7C8DE8",
            "type": "text"
        }
        data.update(getattr(settings, 'SIMULATED_SMS', {}))
        return data 

from django.conf import settings
from django.db import IntegrityError
from profanity import profanity

from dashboard.models import Student, Teacher, Question, Answer, Classroom, Assignment
from dashboard.consumers import send_message


def handle_sms_message(sms_data):
    sms_data = simulated_text_message() if settings.DEBUG and settings.SIMULATE else sms_data
    if profanity.contains_profanity(sms_data["text"]):
        return False
    teacher = Teacher.objects.filter(sms_number=sms_data.get("to")).first()
    if not teacher:
        return False

    funcs = {
        "Classroom": enroll_student,
        "Question": create_answer,
    }
    return funcs[teacher.active_model](teacher.model, teacher.active_classroom, sms_data)


def enroll_student(classroom, _, sms_data):
    name = sms_data["text"]
    phone = sms_data["msisdn"]
    student = Student.objects.filter(classroom=classroom, phone=phone).first()
    student = student or Student(phone=phone, classroom=classroom)
    student.name = name
    student.save()
    send_message(user, {"pk": student.pk, "name": name, "phone": phone})
    print("ADDED STUDENT")
    return True


def create_answer(question, classroom, sms_data):
    student = Student.objects.filter(classroom=classroom, phone=sms_data["msisdn"]).first()
    if student:
        answer = add_answer(student, question, sms_data.get("text"))
        data = {"pk": student.pk, "name": student.name, "answer": answer.text}
        send_message(question, data)
        print("CREATED ANSWER")
        return True
    return False


def add_answer(student, question, text):
    answer, _ = Answer.objects.get_or_create(student=student, question=question)
    answer.text = text
    answer.save()
    return answer


def simulated_text_message(**kwargs):
    data = {
        "keyword": "THIS",
        "msisdn": "18133893559",
        "text": "The study of the earth",
        "to": "18552436932",
        "message-timestamp": "2017-03-12 00:43:33",
        "messageId": "0B0000003B7C8DE8",
        "type": "text"
    }
    data.update(kwargs)
    data.update(settings.SIMULATED_SMS)
    return data

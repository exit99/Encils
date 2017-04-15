import json

from channels import Group
from channels.auth import channel_session_user, channel_session_user_from_http
from django.shortcuts import get_object_or_404

from dashboard.models import Classroom, Question


def channel_name(obj):
    return "{}-{}".format(obj.__class__.__name__, obj.pk)


def send_message(obj, data):
    Group(channel_name(obj)).send({
        'text': json.dumps(data)
    })


@channel_session_user_from_http
def ws_student_connect(message, classroom_pk):
    classroom = get_object_or_404(Classroom, pk=classroom_pk)
    teacher = classroom.user.teacher
    teacher.set_active(classroom)
    teacher.active_classroom = classroom
    teacher.save()

    Group(channel_name(message.user)).add(message.reply_channel)
    Group(channel_name(message.user)).send({
        'text': json.dumps({
            'is_logged_in': True,
        })
    })


@channel_session_user
def ws_student_disconnect(message, classroom_pk):
    Group(channel_name(message.user)).send({
        'text': json.dumps({
            'is_logged_in': False
        })
    })
    Group(channel_name(message.user)).discard(message.reply_channel)


##### TODO: Either need to deactivate a question on each new question activate.  Or to fixe the deactivate. Maybe deactive in middleware. ####
##### TODO: Need to detect who is in class via the attendance ######

@channel_session_user_from_http
def ws_question_answer_connect(message, question_pk, classroom_pk):
    question = get_object_or_404(Question, pk=question_pk)
    classroom = get_object_or_404(Classroom, pk=classroom_pk)
    teacher = question.assignment.user.teacher
    teacher.set_active(question)
    teacher.active_classroom = classroom
    teacher.save()

    Group(channel_name(message.user)).add(message.reply_channel)
    Group(channel_name(message.user)).send({
        'text': json.dumps({
            'is_logged_in': True,
        })
    })


@channel_session_user
def ws_question_answer_disconnect(message, question_pk, classroom_pk):
    Group(channel_name(message.user)).send({
        'text': json.dumps({
            'is_logged_in': False
        })
    })
    Group(channel_name(message.user)).discard(message.reply_channel)

import json

from channels import Group
from channels.auth import channel_session_user_from_http
from channels.handler import AsgiRequest
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework.authentication import TokenAuthentication

from sms.models import Classroom, Question


def user_from_channel_message(message):
    """
    Use the django-rest TokenAuthetication to get the current user from
    a message delivered via django-channels.

    Because additional headers cannot be sent via websocket protocol, we
    send it in the query string and add it to the request as if it were
    already there, that way the app we use the same base method for auth.
    """
    request = AsgiRequest(message)
    token = request.GET.get('token')
    if not token:
        return None
    request.META['HTTP_AUTHORIZATION'] = token
    user, _ = TokenAuthentication().authenticate(request)
    return user


def channel_name(obj):
    return "{}-{}".format(obj.__class__.__name__, obj.pk)


def send_message(name, data):
    Group(name).send({
        'text': json.dumps(data)
    })


def send_teachers_obj_as_message(obj, serializer):
    serializer = serializer(obj)
    send_message(channel_name(obj.teacher), serializer.data)


@channel_session_user_from_http
def ws_student_connect(message, classroom_pk):
    teacher = user_from_channel_message(message)
    classroom = get_object_or_404(Classroom, pk=classroom_pk, teacher=teacher)
    classroom.activate()

    Group(channel_name(teacher)).add(message.reply_channel)
    Group(channel_name(teacher)).send({
        'text': json.dumps({
            'is_logged_in': True,
        })
    })


@channel_session_user_from_http
def ws_student_disconnect(message, classroom_pk):
    classroom = get_object_or_404(Classroom, pk=classroom_pk)
    classroom.deactivate()

    Group(channel_name(message.user)).send({
        'text': json.dumps({
            'is_logged_in': False
        })
    })
    Group(channel_name(message.user)).discard(message.reply_channel)


@channel_session_user_from_http
def ws_question_answer_connect(message, question_pk, classroom_pk):
    #teacher = user_from_channel_message(message)
    #classroom = get_object_or_404(Classroom, pk=classroom_pk, teacher=teacher)
    #question = get_object_or_404(Question, pk=question_pk)
    #if question.teacher != teacher:
    #    raise Http404
    #classroom.activate()
    #question.activate()

    Group(channel_name(teacher)).add(message.reply_channel)
    Group(channel_name(teacher)).send({
        'text': json.dumps({
            'is_logged_in': True,
        })
    })


@channel_session_user_from_http
def ws_question_answer_disconnect(message, question_pk, classroom_pk):
    Group(channel_name(question)).send({
        'text': json.dumps({
            'is_logged_in': False
        })
    })
    Group(channel_name(question)).discard(message.reply_channel)

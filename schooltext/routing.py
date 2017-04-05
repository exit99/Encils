from channels.routing import route
from dashboard.consumers import (
    ws_student_connect,
    ws_student_disconnect,
    ws_question_answer_connect,
    ws_question_answer_disconnect,
)


channel_routing = [
    route('websocket.connect', ws_student_connect, path=r"^/students/(?P<classroom_pk>\d+)/$"),
    route('websocket.disconnect', ws_student_disconnect, path=r"^/students/(?P<classroom_pk>\d+)/$"),

    route('websocket.connect', ws_question_answer_connect, path=r"^/question/answer/(?P<question_pk>\d+)/(?P<classroom_pk>\d+)$"),
    route('websocket.disconnect', ws_question_answer_disconnect, path=r"^/question/answer/(?P<question_pk>\d+)/(?P<classroom_pk>\d+)$"),
]

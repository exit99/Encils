from django.conf import settings
from rest_framework import decorators, generics, permissions, response

from sms.models import (
    Answer,
    Assignment,
    Classroom,
    Question,
    Student,
)
from sms.permissions import IsOwner, FromSMSGateway
from sms.receiver import SMSMessage
from sms.serializers import (
    AnswerSerializer,
    AssignmentSerializer,
    ClassroomSerializer,
    QuestionSerializer,
    StudentSerializer,
)


class ClassroomList(generics.ListCreateAPIView):
    serializer_class = ClassroomSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        teacher = self.request.user
        return teacher.classroom_set.all()

    def perform_create(self, serializer):
        serializer.save(teacher=self.request.user)


class ClassroomDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Classroom.objects.all()
    serializer_class = ClassroomSerializer
    permission_classes = (IsOwner,)

    def perform_update(self, serializer):
        serializer.save(teacher=self.request.user)


class StudentList(generics.ListAPIView):
    serializer_class = StudentSerializer
    permission_classes = (permissions.IsAuthenticated,)
    filter_fields = ('classroom',)

    def get_queryset(self):
        teacher = self.request.user
        return teacher.student_set.all()


class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = (IsOwner,)


class AssignmentList(generics.ListCreateAPIView):
    serializer_class = AssignmentSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        teacher = self.request.user
        return teacher.assignment_set.all()

    def perform_create(self, serializer):
        serializer.save(teacher=self.request.user)


class AssignmentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    permission_classes = (IsOwner,)

    def perform_update(self, serializer):
        serializer.save(teacher=self.request.user)


class QuestionList(generics.ListCreateAPIView):
    serializer_class = QuestionSerializer
    permission_classes = (permissions.IsAuthenticated,)
    filter_fields = ('assignment',)

    def get_queryset(self):
        teacher = self.request.user
        return teacher.question_set.all()


class QuestionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = (IsOwner,)


class AnswerList(generics.ListAPIView):
    serializer_class = AnswerSerializer
    permission_classes = (permissions.IsAuthenticated,)
    filter_fields = ('classroom', 'student')

    def get_queryset(self):
        teacher = self.request.user
        answers = teacher.answer_set

        pk =  self.request.query_params.get('assignment', None)
        if pk:
            assignment = Assignment.objects.filter(pk=pk).first()
            questions = Question.objects.filter(assignment=assignment).all().values_list('pk')
            answers = answers.filter(question__in=questions)

        return answers.all()


class AnswerDetail(generics.RetrieveUpdateAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = (IsOwner,)


@decorators.api_view(['GET', 'POST'])
@decorators.permission_classes([FromSMSGateway])
def receive_sms(request):
    if request.GET or settings.DEBUG:
        msg = SMSMessage(request.GET)
        res = msg.execute()
        return response.Response(res)
    return response.Response(400)

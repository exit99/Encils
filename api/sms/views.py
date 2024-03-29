from django.conf import settings
from django.http import Http404, JsonResponse, HttpResponse, HttpResponseBadRequest
from django.shortcuts import get_object_or_404
from rest_framework import decorators, generics, permissions, response

from sms.forms import DemoRequestForm
from sms.models import (
    Answer,
    Assignment,
    Attendance,
    Classroom,
    Question,
    Student,
    ActiveItem,
)
from sms.permissions import is_owner, IsOwner, FromSMSGateway
from sms.receiver import SMSMessage
from sms.serializers import (
    AnswerSerializer,
    AssignmentSerializer,
    AttendanceSerializer,
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


class StudentList(generics.ListCreateAPIView):
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


@decorators.api_view(['GET'])
@decorators.permission_classes([])
def ungraded_assignments(request):
    teacher = request.user
    try:
        answers = teacher.answer_set.filter(grade=None).all()
    except AttributeError:
        raise Http404
    assignments = set([(a.classroom, a.assignment) for a in answers])
    data = []
    for classroom, assignment in assignments:
        item = AssignmentSerializer(assignment).data
        item['classroom'] = classroom.name
        item['classroom_pk'] = classroom.pk
        data.append(item)
    return JsonResponse(data, safe=False)


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
    filter_fields = ('question', 'classroom', 'grade', 'question__assignment')

    def get_queryset(self):
        teacher = self.request.user
        answers = teacher.answer_set
        return answers.all()


class AnswerDetail(generics.RetrieveUpdateAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = (IsOwner,)


class QuestionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = (IsOwner,)


class AttendanceList(generics.ListCreateAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = (IsOwner,)
    filter_fields = ('date', 'student', 'classroom')


class AttendanceDetail(generics.RetrieveUpdateAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = (IsOwner,)


@decorators.api_view(['GET'])
@decorators.permission_classes([])
def attendance_today(request, pk):
    classroom = get_object_or_404(Classroom, pk=pk)
    if not is_owner(request.user, classroom):
        raise Http404
    return response.Response(Attendance.attendance_today(classroom))


@decorators.api_view(['GET', 'POST'])
@decorators.permission_classes([FromSMSGateway])
def receive_sms(request):
    if request.GET or settings.DEBUG:
        msg = SMSMessage(request.GET)
        res = msg.execute()
        return response.Response(res)
    return response.Response(400)


@decorators.api_view(['GET', 'PUT'])
@decorators.permission_classes([])
def active_item(request):
    active_item, _ = ActiveItem.objects.get_or_create(teacher=request.user)
    if request.data:
        active_item.activate_classroom(request.data.get('classroom'))
        active_item.activate_question(request.data.get('question'))
    data = {
        'classroom': getattr(active_item.classroom, 'pk', None), 
        'question': getattr(active_item.question, 'pk', None),
    }
    return JsonResponse(data)


@decorators.api_view(['POST'])
@decorators.permission_classes([])
def demo_request(request):
    form = DemoRequestForm(request.POST or None)
    if form.is_valid():
        form.send_email()
        return HttpResponse()
    return HttpResponseBadRequest()


@decorators.api_view(['GET'])
@decorators.permission_classes([])
def grades_download(request, pk):
    classroom = get_object_or_404(Classroom, pk=pk)
    if not is_owner(request.user, classroom):
        raise Http404
    return classroom.csv_response


@decorators.api_view(['GET'])
@decorators.permission_classes([])
def assignment_grades_download(request, pk):
    assignment = get_object_or_404(Assignment, pk=pk)
    if not is_owner(request.user, assignment):
        raise Http404
    return assignment.csv_response

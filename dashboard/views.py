import csv
import json
from io import StringIO
from itertools import groupby

from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.core.urlresolvers import reverse_lazy
from django.http import Http404, HttpResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic.base import TemplateView 
from django.views.generic.edit import CreateView, UpdateView
from django.views.generic.list import ListView

from dashboard.forms import AttendanceForm
from dashboard.models import Classroom, Question, Student, Assignment, Answer, Attendance


def dashboard(request):
    classrooms = Classroom.objects.filter(user=request.user).all()
    context = {"classrooms": classrooms}
    return render(request, "dashboard/classrooms.html", context)


######## TODO: NEED TO ADD OWNERSHIP CONFIRMATION!!!!!!!!! ###########


class ClassroomCreate(CreateView):
    model = Classroom
    fields = ['name', 'school']
    success_url = reverse_lazy("dashboard")

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)


class QuestionCreate(CreateView):
    model = Question
    fields = ['question']
    success_url = reverse_lazy('assignments')

    def form_valid(self, form):
        form.instance.assignment = Assignment.objects.get(
            pk=self.kwargs["assignment_pk"])
        return super().form_valid(form)


def students_create(request, classroom_pk):
    classroom = get_object_or_404(Classroom, pk=classroom_pk)
    students = Student.objects.filter(classroom=classroom).all()
    context = {
        "classroom": classroom,
        "students": students,
        "sms_number": request.user.teacher.sms_number,
    }
    return render(request, "dashboard/students.html", context)


class StudentUpdate(UpdateView):
    model = Student
    fields = ['name']

    def get_object(self, queryset=None):
        return Student.objects.get(pk=self.kwargs['pk'])

    def get_success_url(self): 
        classroom_pk = self.object.classroom.pk
        return reverse_lazy('classroom', kwargs={'pk': classroom_pk})


def attendance(request, classroom_pk):
    classroom = get_object_or_404(Classroom, pk=classroom_pk)
    students = Student.objects.filter(classroom=classroom).order_by('name')
    form = AttendanceForm(request.POST or None, students=students)
    if form.is_valid():
        form.save(classroom)
        if not Assignment.objects.filter(user=request.user).exists():
            return redirect("assignments")
        return redirect("choose-assignment", classroom_pk=classroom.pk)

    context = {
        "classroom": classroom,
        "form": form,
    }
    return render(request, "dashboard/attendance.html", context)


def download_attendance(request, classroom_pk):
    classroom = get_object_or_404(Classroom, pk=classroom_pk)
    if classroom.user != request.user:
        raise Http404()

    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="{}-attendance.csv"'.format(
        classroom.name)

    for attendance in Attendance.objects.filter(classroom=classroom).all():
        writer = csv.writer(response)
        for k, v in attendance.attendance.items():
            writer.writerow([attendance.date, Student.objects.get(pk=int(k)).name,
                            "here" if v else "absent"])
            writer.writerow([])
            writer.writerow([])
    return response




class AssignmentList(ListView):
    model = Assignment

    def get_queryset(self):
        return Assignment.objects.filter(user=self.request.user).order_by("-pk")


class ChooseAssignment(AssignmentList):
    def get_context_data(self, **kwargs):
        context = super(ChooseAssignment, self).get_context_data(**kwargs)
        context.update({
            "classroom": Classroom.objects.get(pk=self.kwargs["classroom_pk"]),
            "choose": True,
        })
        return context


class AssignmentCreate(CreateView):
    model = Assignment
    fields = ['name']
    success_url = reverse_lazy("assignments")

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)


def start_assignment(request, assignment_pk, classroom_pk, question_index):
    question_index = int(question_index)
    assignment = get_object_or_404(Assignment, pk=assignment_pk)
    classroom = get_object_or_404(Classroom, pk=classroom_pk)
    try:
        questions = assignment.question_set.all()
        question = questions[question_index]
    except (IndexError):
        raise Http404("Bad question index.")

    students = [s.render() for s in classroom.student_set.all()]

    next_index = None
    if question_index < len(questions) - 1:
        next_index = question_index + 1

    context = {
        "question": question,
        "assignment_pk": assignment_pk,
        "classroom_pk": classroom_pk,
        "next_index": next_index,
        "students": json.dumps(students),
    }
    return render(request, "dashboard/question_answer.html", context)


class AssignmentComplete(TemplateView):
    template_name = "dashboard/assignment_complete.html"

    def get_context_data(self, **kwargs):
        classroom_pk = self.kwargs["classroom_pk"]
        classroom = get_object_or_404(Classroom, pk=classroom_pk)
        classroom.user.teacher.deactivate_all()
        context = super(AssignmentComplete, self).get_context_data(**kwargs)
        context["classroom_pk"] = classroom_pk
        return context


class AnswersList(ListView):
    model = Answer
    template_name = "dashboard/answer_list.html"

    def get_queryset(self):
        classroom = Classroom.objects.get(pk=self.kwargs["classroom_pk"])
        students = classroom.student_set.all()

        answers = []
        for student in students:
            answers += student.answer_set.order_by("question")
        answers = [(Assignment.objects.get(pk=pk), list(ans))
                   for pk, ans in groupby(answers, key=lambda x: x.assignment.pk)]
        answers = [(assignment, ans, all(map(lambda x: x.grade is not None, ans)))
                   for assignment, ans in answers]
        return answers

    def get_context_data(self, **kwargs):
        classroom_pk = self.kwargs["classroom_pk"]
        classroom = get_object_or_404(Classroom, pk=classroom_pk)
        context = super(AnswersList, self).get_context_data(**kwargs)
        context["classroom"] = classroom
        return context


def grade(request, classroom_pk, assignment_pk):
    classroom = get_object_or_404(Classroom, pk=classroom_pk)
    assignment = get_object_or_404(Assignment, pk=assignment_pk)
    if classroom.user != request.user or assignment.user != classroom.user:
        raise Http404()
    
    # This is bad.
    answers = {} 
    for question in assignment.question_set.order_by('pk'):
        a = Answer.objects.filter(question=question).order_by('student')
        a = [ans for ans in a if ans.student.classroom == classroom]
        answers[question] = a

    # Need to check for people not in attendance.

    context = {
        'classroom': classroom,
        'assignment': assignment,
        'answers': answers.items(),
    }
    return render(request, "dashboard/grade.html", context)


def grade_save(request, classroom_pk, assignment_pk):
    classroom = get_object_or_404(Classroom, pk=classroom_pk)
    assignment = get_object_or_404(Assignment, pk=assignment_pk)
    if classroom.user != request.user or assignment.user != classroom.user \
            or request.method != "POST":
        raise Http404()

    for k, v in request.POST.items():
        if k.startswith("csrf"):
            continue
        answer = Answer.objects.get(pk=int(k[7:]))
        answer.grade = int(v)
        answer.save()

    return redirect('view-answers', classroom_pk=classroom_pk)


def download_grades(request, classroom_pk, assignment_pk):
    classroom = get_object_or_404(Classroom, pk=classroom_pk)
    assignment = get_object_or_404(Assignment, pk=assignment_pk)
    if classroom.user != request.user or assignment.user != classroom.user:
        raise Http404()
    
    # This is bad.
    answers = {} 
    for question in assignment.question_set.order_by('pk'):
        a = Answer.objects.filter(question=question).order_by('student')
        a = [ans for ans in a if ans.student.classroom == classroom]
        answers[question] = a

    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="{}-{}.csv"'.format(
        classroom.name, assignment.name)
    writer = csv.writer(response)
    writer.writerow([list(answers.values())[0][0].student.classroom.name,
                     list(answers.keys())[0].assignment.name])
    for question, answers in answers.items():
        writer.writerow([])
        writer.writerow([])
        writer.writerow([question.question])
        writer.writerow([])
        writer.writerow(["student", "answer", "grade"])
        for answer in answers:
            writer.writerow([answer.student.name, answer.text, answer.grade])
    return response


def delete_classroom(request, classroom_pk):
    classroom = get_object_or_404(Classroom, pk=classroom_pk)
    if classroom.user != request.user:
        raise Http404()
    classroom.delete()
    return redirect('dashboard')


def delete_assignment(request, assignment_pk):
    assignment = get_object_or_404(Assignment, pk=assignment_pk)
    if assignment.user != request.user:
        raise Http404()
    assignment.delete()
    return redirect('assignments')


def delete_question(request, question_pk):
    question = get_object_or_404(Question, pk=question_pk)
    if question.assignment.user != request.user:
        raise Http404()
    question.delete()
    return redirect('assignments')


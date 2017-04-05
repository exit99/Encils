from django.conf.urls import url

from dashboard import views
from django.views.generic.base import TemplateView 


urlpatterns = [
    # This should be a one pager
    url(r'^test/$', TemplateView.as_view(template_name='dashboard/test/dashboard.html')),

    url(r'^$', views.dashboard, name='dashboard'),
    url(r'^classroom/create/$', views.ClassroomCreate.as_view(), name='classroom-create'),
    url(r'^student/create/(?P<classroom_pk>\d+)$', views.students_create, name='student-create'),
    url(r'^student/(?P<pk>\d+)/$', views.StudentUpdate.as_view(), name='student-update'),
    url(r'^attendance/(?P<classroom_pk>\d+)/$', views.attendance, name='attendance'),
    url(r'^attendance/download/(?P<classroom_pk>\d+)/$', views.download_attendance, name='download-attendance'),
    url(r'^assignments/$', views.AssignmentList.as_view(), name='assignments'),
    url(r'^assignments/create/$', views.AssignmentCreate.as_view(), name='assignment-create'),
    url(r'^question/create/(?P<assignment_pk>\d+)/$', views.QuestionCreate.as_view(), name='question-create'),
    url(r'^assignments/choose/(?P<classroom_pk>\d+)/$', views.ChooseAssignment.as_view(), name='choose-assignment'),
    url(r'^answer/question/(?P<assignment_pk>\d+)/(?P<classroom_pk>\d+)/(?P<question_index>\d+)/$',
        views.start_assignment, name='start-assignment'),
    url(r'^assignment/complete/(?P<classroom_pk>\d+)/$', views.AssignmentComplete.as_view(), name='assignment-complete'),
    url(r'^answers/(?P<classroom_pk>\d+)/$', views.AnswersList.as_view(), name='view-answers'),
    url(r'^grade/(?P<classroom_pk>\d+)/(?P<assignment_pk>\d+)/$', views.grade, name='grade'),
    url(r'^grade/save/(?P<classroom_pk>\d+)/(?P<assignment_pk>\d+)/$', views.grade_save, name='grade-save'),
    url(r'^grade/download/(?P<classroom_pk>\d+)/(?P<assignment_pk>\d+)/$', views.download_grades, name='download-grades'),

    url(r'^classroom/delete/(?P<classroom_pk>\d+)$', views.delete_classroom, name='classroom-delete'),
    url(r'^assignment/delete/(?P<assignment_pk>\d+)$', views.delete_assignment, name='delete-assignment'),
    url(r'^question/delete/(?P<question_pk>\d+)$', views.delete_question, name='delete-question'),
]

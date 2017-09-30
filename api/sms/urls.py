from django.conf.urls import url

from sms import views


urlpatterns = [
    url(r'^classrooms/$', views.ClassroomList.as_view()),
    url(r'^classrooms/(?P<pk>[0-9]+)/$', views.ClassroomDetail.as_view()),
    url(r'^classrooms/(?P<pk>[0-9]+)/grades/download/$', views.grades_download),
    url(r'^students/$', views.StudentList.as_view()),
    url(r'^students/(?P<pk>[0-9]+)/$', views.StudentDetail.as_view()),
    url(r'^assignments/$', views.AssignmentList.as_view()),
    url(r'^assignments/ungraded/$', views.ungraded_assignments),
    url(r'^assignments/(?P<pk>[0-9]+)/$', views.AssignmentDetail.as_view()),
    url(r'^assignments/(?P<pk>[0-9]+)/grades/download/$', views.assignment_grades_download),
    url(r'^questions/$', views.QuestionList.as_view()),
    url(r'^questions/(?P<pk>[0-9]+)/$', views.QuestionDetail.as_view()),
    url(r'^answers/$', views.AnswerList.as_view()),
    url(r'^answers/(?P<pk>[0-9]+)/$', views.AnswerDetail.as_view()),
    url(r'^attendance/$', views.AttendanceList.as_view()),
    url(r'^attendance/(?P<pk>[0-9]+)/$', views.AttendanceDetail.as_view()),
    url(r'^attendance/(?P<pk>[0-9]+)/today/$', views.attendance_today),
    url(r'^receive/$', views.receive_sms),
    url(r'^active-item/$', views.active_item),
    url(r'^demo-request/$', views.demo_request),
]

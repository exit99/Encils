from django.forms import Form, BooleanField
from django.utils import timezone

from dashboard.models import Attendance


class AttendanceForm(Form):
    prefix = "pk-"

    def __init__(self, *args, students=[], **kwargs):
        super(AttendanceForm, self).__init__(*args, **kwargs)
        for student in students:
            key = "{}{}".format(self.prefix, student.pk)
            self.fields[key] = BooleanField(initial=True, label=student.name)

    def save(self, classroom):
        data = {int(k[len(self.prefix):]): v 
                for k, v in self.cleaned_data.items()}
        attendance, _ = Attendance.objects.get_or_create(
            classroom=classroom, date=timezone.now())
        attendance.attendance = data
        attendance.save()
        return attendance

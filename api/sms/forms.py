from django import forms
from django.core.mail import send_mail


class DemoRequestForm(forms.Form):
    name = forms.CharField()
    school = forms.CharField()
    email = forms.EmailField()
    phone = forms.CharField()

    def send_email(self):
        fields = ['{}: {}'.format(k, v) for k, v in self.cleaned_data.items()]
        msg = '\n\n'.join(sorted(fields))
        send_mail(
            'Demo Request',
            msg,
            'no-reply@encils.com',
            ['kazanski.zachary@gmail.com'],
            fail_silently=False,
        )

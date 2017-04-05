from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt

from dashboard.helpers import handle_sms_message
from dashboard.models import Teacher


def index(request):
    return render(request, 'index.html', {})


def register(request):
    form = UserCreationForm(request.POST or None)
    if form.is_valid():
        user = form.save()
        Teacher.objects.create(user=user)
        login(request, user)
        return redirect('dashboard')
    context = {"form": form}
    return render(request, "register.html", context)


@csrf_exempt
def receive_sms(request):
    return HttpResponse(handle_sms_message(request.GET))

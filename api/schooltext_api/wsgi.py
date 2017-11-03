"""
WSGI config for schooltext_api project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.10/howto/deployment/wsgi/
"""
import os

import newrelic.agent
from django.core.wsgi import get_wsgi_application
from django.conf import settings



os.environ.setdefault("DJANGO_SETTINGS_MODULE", "schooltext_api.local")

application = get_wsgi_application()
if settings.PROD:
    newrelic.agent.initialize('/app/newrelic.ini', 'encils-api')
    application = newrelic.agent.wsgi_application()(application)

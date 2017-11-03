"""
WSGI config for schooltext_api project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.10/howto/deployment/wsgi/
"""
import newrelic.agent
newrelic.agent.initialize('/app/newrelic.ini', 'core')

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "schooltext_api.local")

application = newrelic.agent.wsgi_application()(get_wsgi_application())

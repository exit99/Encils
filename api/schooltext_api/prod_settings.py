import os

from schooltext_api.settings import *

DEBUG = False
SECRET_KEY = "WKLHLEGHWWfekh2g89ehge2ghEbGHieklgh2"
PROD = True

DATABASES['default'] = {
    'ENGINE': 'django.db.backends.mysql',
    'NAME': 'encilsdb',
    'USER': 'encilsuser',
    'HOST': 'aa1dlwzd9c7n274.c1vqcdpwlpkq.us-east-1.rds.amazonaws.com',
    'PASSWORD': os.environ.get('RDS_PASSWORD', ''),
}

DJOSER['DOMAIN'] = 'http://dashboard.encils.s3-website-us-east-1.amazonaws.com'

EMAIL_BACKEND = 'django_ses.SESBackend'

LOGGING_CONFIG = None
LOGGING = {
    'loggers': {
        'django': {
            'level': 'ERROR', 'handlers': ['console'],
         },
    }
}

INSTALLED_APPS.append('raven.contrib.django.raven_compat')
RAVEN_CONFIG = {
    'dsn': 'https://6e67d23db89e48cd81d9275515c7286a:754268566e124efdaaf8f83bac21d78a@sentry.io/239371',
}

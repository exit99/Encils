import os

from schooltext_api.settings import *

DEBUG = False
SECRET_KEY = "WKLHLEGHWWfekh2g89ehge2ghEbGHieklgh2"

DATABASES['default'] = {
    'ENGINE': 'django.db.backends.mysql',
    'NAME': 'encilsdb',
    'USER': 'encilsuser',
    'HOST': 'aa1dlwzd9c7n274.c1vqcdpwlpkq.us-east-1.rds.amazonaws.com',
    'PASSWORD': os.environ.get('RDS_PASSWORD', ''),
}

DJOSER['DOMAIN'] = 'http://dashboard.encils.s3-website-us-east-1.amazonaws.com'

EMAIL_BACKEND = 'django_ses.SESBackend'

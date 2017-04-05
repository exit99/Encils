from .settings import *


DEBUG = True
SIMULATE = True

ALLOWED_HOSTS = ["*"]

INSTALLED_APPS += ['django_extensions']

SIMULATED_SMS = {
    "to": "13232022665",
    "text": "Boom shockalocka",
    "msisdn": "22328284482",
}

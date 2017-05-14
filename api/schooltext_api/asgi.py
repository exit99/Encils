import os
from channels.asgi import get_channel_layer

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "schooltext_api.local")

channel_layer = get_channel_layer()
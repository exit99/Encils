from django.apps import AppConfig


class SmsConfig(AppConfig):
    name = 'sms'

    def ready(self):
        import sms.signals

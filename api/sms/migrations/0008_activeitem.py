# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-02 20:00
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sms', '0007_answer'),
    ]

    operations = [
        migrations.CreateModel(
            name='ActiveItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('classroom', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='sms.Classroom')),
                ('question', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='sms.Question')),
                ('teacher', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
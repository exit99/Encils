# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-08-26 16:02
from __future__ import unicode_literals

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sms', '0009_auto_20170419_0046'),
    ]

    operations = [
        migrations.AddField(
            model_name='assignment',
            name='hide_answers',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='assignment',
            name='one_at_a_time',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='answer',
            name='grade',
            field=models.IntegerField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(5), django.core.validators.MinValueValidator(0)]),
        ),
        migrations.AlterField(
            model_name='attendance',
            name='status',
            field=models.CharField(choices=[('present', 'present'), ('tardy', 'tardy'), ('absent', 'absent')], default='present', max_length=7),
        ),
    ]

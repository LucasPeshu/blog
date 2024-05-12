# Generated by Django 5.0.6 on 2024-05-11 23:26

import blog.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0004_alter_post_thumbnail'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='thumbnail',
            field=models.ImageField(blank=True, null=True, upload_to=blog.models.user_directory_path),
        ),
    ]

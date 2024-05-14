import os
from django.db import models
from django.utils.text import slugify
from django.utils import timezone
from django.contrib.auth.models import User

def upload_to(instance, filename):
    """
    Función de ayuda para generar nombres de archivo únicos
    """
    base_filename, file_extension = os.path.splitext(filename)
    new_filename = slugify(base_filename) + file_extension
    return os.path.join('blog/', new_filename)

def user_directory_path(instance, filename):
    return 'blog/{0}/{1}'.format(instance.title, filename)

class Categoria(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Post(models.Model):

    class PostObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')

    options = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )

    title = models.CharField(max_length=250)
    thumbnail = models.ImageField(upload_to=upload_to, blank=True, null=True)
    excerpt = models.TextField(null=True)
    content = models.TextField()
    slug = models.SlugField(max_length=250, unique_for_date='published', null=False, unique=True)
    published = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='post_user')
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name='post_categoria', null=True, blank=True)

    status = models.CharField(max_length=10, choices=options, default='draft')
    objects = models.Manager()
    postobjects = PostObjects()

    class Meta:
        ordering = ('-published',)

    def __str__(self):
        return self.title

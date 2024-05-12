from rest_framework import serializers
from .models import Post, Categoria

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'thumbnail', 'excerpt', 'content', 'slug', 'published', 'author', 'status', 'categoria')


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ('id', 'nombre')
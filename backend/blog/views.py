from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Post, Categoria
from .serializers import PostSerializer, CategoriaSerializer


class BlogListView(APIView):
    def get(self, request, *args, **kwargs):
        posts = Post.postobjects.all()[0:8]
        serializer = PostSerializer(posts,many=True)
        return Response(serializer.data)


class PostDetailView(APIView):
    def get(self, request, post_slug,*args, **kwargs):
        post = get_object_or_404(Post, slug=post_slug)
        serializer = PostSerializer(post)
        return Response(serializer.data)


class PostsPorCategoria(APIView):
    def get(self, request, categoria_nombre, *args, **kwargs):
        categoria = get_object_or_404(Categoria, nombre=categoria_nombre)
        posts = Post.postobjects.filter(categoria=categoria.id)
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

class CategoriaListView(APIView):
    def get(self, request, *args, **kwargs):
        categorias = Categoria.objects.all()
        serializer = CategoriaSerializer(categorias, many=True)
        return Response(serializer.data)

from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Post, Categoria
from .serializers import PostSerializer, CategoriaSerializer
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q


class BlogListView(APIView):
    def get(self, request, *args, **kwargs):
        paginator = PageNumberPagination()
        paginator.page_size = 8
        posts = Post.postobjects.all()
        result_page = paginator.paginate_queryset(posts, request)
        serializer = PostSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

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

class SearchBlogView(APIView):
    def get(self, request, search_term):
        matches = Post.postobjects.filter(
            Q(title__icontains=search_term) |
            Q(content__icontains=search_term) |
            Q(categoria__nombre__icontains=search_term)
        )

        serializer = PostSerializer(matches, many=True)
        return Response({'filtered_posts': serializer.data}, status=status.HTTP_200_OK)
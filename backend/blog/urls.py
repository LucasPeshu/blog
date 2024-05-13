from django.urls import path

from .views import BlogListView, PostDetailView, PostsPorCategoria, CategoriaListView, SearchBlogView

app_name = "blog"

urlpatterns = [
    path('posts/', BlogListView.as_view()),
    path('posts/<post_slug>/', PostDetailView.as_view()),
    path('posts/categoria/<categoria_nombre>/', PostsPorCategoria.as_view()),
    path('categorias/', CategoriaListView.as_view()),
    path("posts/search/<str:search_term>", SearchBlogView.as_view()),
    
]

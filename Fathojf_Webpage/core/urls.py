from django.urls import path
from . import views

app_name = 'core'

urlpatterns = [
    path('', views.home, name='home'),  # Página inicial
    path('about/', views.about, name='about'),  # Página "Sobre"
    path('contact/', views.contact, name='contact'),
    path('blog/', views.blog, name='blog'),
    path('blog/<int:post_id>/', views.post_detail, name='post_detail'),
    path('booking/', views.booking_view, name='booking'),
]

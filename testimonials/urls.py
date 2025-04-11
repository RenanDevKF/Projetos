# testimonials/urls.py
from django.urls import path
from . import views

app_name = 'testimonials'

urlpatterns = [
    path('', views.TestimonialListView.as_view(), name='list'),
    path('create/', views.TestimonialCreateView.as_view(), name='create'),
    path('thanks/', views.thanks_view, name='thanks'),
]

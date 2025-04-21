# services/admin.py
from django.contrib import admin
from .models import Service

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'duration', 'is_featured')
    prepopulated_fields = {'slug': ('name',)}
    list_filter = ('is_featured',)
    search_fields = ('name', 'description')

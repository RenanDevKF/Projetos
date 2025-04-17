from django.contrib import admin
from .models import Sobre
from django.utils.safestring import mark_safe

@admin.register(Sobre)
class SobreAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'ativo', 'preview_admin')
    list_editable = ('ativo',)
    
    fieldsets = (
        (None, {
            'fields': ('titulo', 'ativo')
        }),
        ('Conteúdo', {
            'fields': ('foto', 'preview', 'descricao'),
            'classes': ('wide',),
        }),
    )
    
    readonly_fields = ('preview',)
    
    def preview(self, obj):
        if obj.foto:
            return mark_safe(f'<img src="{obj.foto.url}" style="max-height: 200px; max-width: 100%;" />')
        return "Nenhuma imagem cadastrada"
    
    preview.short_description = "Pré-visualização atual"
    
    def preview_admin(self, obj):
        return self.preview(obj)
    
    preview_admin.short_description = "Visualização"
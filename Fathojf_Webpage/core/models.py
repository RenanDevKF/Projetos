from django.db import models
from django_ckeditor_5.fields import CKEditor5Field

class Sobre(models.Model):
    titulo = models.CharField('Título', max_length=100, default='Sobre a Fatho')
    foto = models.ImageField('Foto de perfil', upload_to='sobre/')
    descricao = CKEditor5Field('Descrição completa')  # Campo único para o texto
    ativo = models.BooleanField('Ativo', default=True)
    
    class Meta:
        verbose_name = 'Sobre'
        verbose_name_plural = 'Sobre'
    
    def __str__(self):
        return self.titulo

    def save(self, *args, **kwargs):
        if self.ativo:
            Sobre.objects.exclude(pk=self.pk).update(ativo=False)
        super().save(*args, **kwargs)
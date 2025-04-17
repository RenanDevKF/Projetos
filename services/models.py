# services/models.py
from django.db import models
from django.utils.text import slugify
from django.core.exceptions import ValidationError


def validate_image_size(image):
    min_width = 800
    min_height = 600

    if image.width < min_width or image.height < min_height:
        raise ValidationError(
            f'A imagem deve ter pelo menos {min_width}x{min_height} pixels'
        )
class Service(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)
    short_description = models.TextField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.IntegerField(help_text="Duração em minutos")
    tagline = models.CharField(max_length=200, blank=True, 
                             help_text="Frase de efeito para o serviço")
    image = models.ImageField(
        upload_to='services/',
        validators=[validate_image_size],
        help_text='Imagem recomendada: 800x600px (proporção 4:3)'
    )
    is_featured = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


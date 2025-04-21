# testimonials/forms.py
from django import forms
from .models import Testimonial
from django.core.validators import MinValueValidator, MaxValueValidator

class TestimonialForm(forms.ModelForm):
    class Meta:
        model = Testimonial
        fields = ['name', 'photo', 'comment', 'rating']
        widgets = {
            'rating': forms.NumberInput(attrs={'min': 1, 'max': 5}),
        }

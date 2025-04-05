# testimonials/views.py
from django.shortcuts import render
from .models import Testimonial
from django.views.generic import ListView, CreateView
from django.urls import reverse_lazy
from .forms import TestimonialForm

class TestimonialListView(ListView):
    model = Testimonial
    template_name = 'testimonials/list.html'
    context_object_name = 'testimonials'
    
    def get_queryset(self):
        return Testimonial.objects.filter(is_approved=True)

class TestimonialCreateView(CreateView):
    model = Testimonial
    form_class = TestimonialForm
    template_name = 'testimonials/create.html'
    success_url = reverse_lazy('testimonials:thanks')
    
def thanks_view(request):
    return render(request, 'testimonials/thanks.html')

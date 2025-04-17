from django.shortcuts import render
from services.models import Service
from testimonials.models import Testimonial
from .models import Sobre

def home(request):
    # Obter todos os dados necessários
    featured_services = Service.objects.filter(is_featured=True)[:6]
    testimonials = Testimonial.objects.filter(is_approved=True)[:10]
    sobre = Sobre.objects.filter(ativo=True).first()
    
    # Criar um único contexto com todos os dados
    context = {
        'featured_services': featured_services,
        'testimonials': testimonials,
        'sobre': sobre  # Agora está incluído no mesmo contexto
    }
    
    return render(request, 'core/home.html', context)

def about(request):
    return render(request, 'core/about.html')

def contact(request):
    return render(request, 'core/contact.html')


def blog(request):
    return render(request, 'core/blog.html')

def post_detail(request, post_id):
    return render(request, 'core/post_detail.html', {'post_id': post_id})

def booking_view(request):
    return render(request, 'booking.html')

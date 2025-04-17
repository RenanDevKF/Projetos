from django.shortcuts import render
from services.models import Service
from testimonials.models import Testimonial

def home(request):
    featured_services = Service.objects.filter(is_featured=True)[:6]
    testimonials = Testimonial.objects.filter(is_approved=True)[:10]
    
    return render(request, 'core/home.html', {
        'featured_services': featured_services,
        'testimonials': testimonials,
    })

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

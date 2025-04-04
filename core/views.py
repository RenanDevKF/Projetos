from django.shortcuts import render

def home(request):
    return render(request, 'core/home.html')

def about(request):
    return render(request, 'core/about.html')

def contact(request):
    return render(request, 'core/contact.html')

def services(request):
    return render(request, 'core/services.html')

def blog(request):
    return render(request, 'core/blog.html')

def post_detail(request, post_id):
    return render(request, 'core/post_detail.html', {'post_id': post_id})

def booking_view(request):
    return render(request, 'booking.html')

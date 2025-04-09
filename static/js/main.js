document.addEventListener('DOMContentLoaded', function() {
    // Animação ao rolar para elementos com a classe 'service-card'
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar todos os cartões de serviço
    document.querySelectorAll('.service-card').forEach(card => {
        card.classList.add('opacity-0', 'translate-y-8');
        observer.observe(card);
    });
    
    // Efeito de onda ao clicar nos botões
    document.querySelectorAll('.service-card a').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Adicionar classe para animação ao rolar
document.addEventListener('scroll', function() {
    const servicesSection = document.getElementById('servicos');
    if (servicesSection) {
        const sectionPosition = servicesSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition) {
            servicesSection.classList.add('services-active');
        }
    }
});
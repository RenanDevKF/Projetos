document.addEventListener('DOMContentLoaded', function () {
    initServiceCardsAnimation();
    initRippleEffect();
    initScrollTrigger();
    initSmoothScrollLinks();
    initTestimonialsCarousel();
});

// === ANIMAÇÃO DOS CARDS DE SERVIÇO ===
function initServiceCardsAnimation() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    document.querySelectorAll('.service-card').forEach(card => {
        card.classList.add('opacity-0', 'translate-y-8');
        observer.observe(card);
    });
}

    // === EFEITO DE CLIQUE COM ONDA ===
    function initRippleEffect() {
        const rippleElements = [
            '.service-card a', 
            '.service-card-link',
            '.btn-booking',
            '.flex.justify-center.gap-4 a'
        ].join(', ');

        document.querySelectorAll(rippleElements).forEach(button => {
            button.addEventListener('click', function(e) {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('span');
                ripple.className = 'ripple-effect';
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;

                button.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

// === ANIMAÇÃO AO ROLAR ATÉ SEÇÃO DE SERVIÇOS ===
function initScrollTrigger() {
    document.addEventListener('scroll', () => {
        const section = document.getElementById('servicos');
        if (section && section.getBoundingClientRect().top < window.innerHeight / 1.3) {
            section.classList.add('services-active');
        }
    });
}

// === NAVEGAÇÃO SUAVE PARA TODOS ===
function initSmoothScrollLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// === CARROSSEL DE DEPOIMENTOS ===
function initTestimonialsCarousel() {
    const track = document.querySelector('.testimonials-track');
    const slides = document.querySelectorAll('.testimonial-slide:not(.empty-slide)');
    const dots = document.querySelectorAll('.testimonial-dot');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');

    if (!track || slides.length === 0) return;

    // Clone os primeiros e últimos slides para criar o efeito infinito
    const clonesStart = Array.from(slides).slice(0, 3).map(slide => slide.cloneNode(true));
    const clonesEnd = Array.from(slides).slice(-3).map(slide => slide.cloneNode(true));
    
    clonesEnd.forEach(clone => track.insertBefore(clone, slides[0]));
    clonesStart.forEach(clone => track.appendChild(clone));

    const allSlides = document.querySelectorAll('.testimonial-slide');
    let currentIndex = clonesEnd.length; // Começa após os clones iniciais
    let slideWidth;
    let slidesToShow;
    let isAnimating = false;

    function calculateDimensions() {
        const container = document.querySelector('.testimonials-container');
        const containerWidth = container ? container.offsetWidth : 0;
        slidesToShow = window.innerWidth >= 768 ? 3 : 1;
        slideWidth = containerWidth / slidesToShow;
        
        allSlides.forEach(slide => {
            slide.style.minWidth = `${slideWidth}px`;
        });
        
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    function goToSlide(index, animate = true) {
        if (isAnimating) return;
        isAnimating = true;
        
        currentIndex = index;
        const translateX = currentIndex * slideWidth;
        
        track.style.transition = animate ? 'transform 0.5s ease' : 'none';
        track.style.transform = `translateX(-${translateX}px)`;
        
        updateDots();
        updateActiveSlides();
    }

    function handleTransitionEnd() {
        isAnimating = false;
        
        // Se chegou nos clones do início (voltando)
        if (currentIndex <= 0) {
            currentIndex = slides.length; // Vai para o final dos slides reais
            goToSlide(currentIndex, false);
        } 
        // Se chegou nos clones do final (avançando)
        else if (currentIndex >= allSlides.length - slidesToShow) {
            currentIndex = clonesEnd.length; // Volta para o início dos slides reais
            goToSlide(currentIndex, false);
        }
    }

    function updateDots() {
        const realIndex = (currentIndex - clonesEnd.length) % slides.length;
        const dotIndex = realIndex < 0 ? slides.length + realIndex : realIndex;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('bg-fatho-gold', i === dotIndex);
            dot.classList.toggle('bg-transparent', i !== dotIndex);
        });
    }

    function updateActiveSlides() {
        allSlides.forEach((slide, i) => {
            const card = slide.querySelector('.testimonial-card');
            if (card) {
                card.classList.remove('active');
                card.style.zIndex = '1';
                
                // Ativa o slide central
                if (i === currentIndex + Math.floor(slidesToShow / 2)) {
                    card.classList.add('active');
                    card.style.zIndex = '10';
                }
            }
        });
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // Event listeners
    track.addEventListener('transitionend', handleTransitionEnd);
    
    if (prevButton) prevButton.addEventListener('click', e => {
        e.preventDefault();
        prevSlide();
    });

    if (nextButton) nextButton.addEventListener('click', e => {
        e.preventDefault();
        nextSlide();
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', e => {
            e.preventDefault();
            goToSlide(i + clonesEnd.length);
        });
    });

    // Swipe handling
    let touchStartX = 0;
    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].screenX;
        const threshold = 50;
        if (touchStartX - touchEndX > threshold) nextSlide();
        else if (touchEndX - touchStartX > threshold) prevSlide();
    }, { passive: true });

    // Responsive handler
    window.addEventListener('resize', () => {
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(() => {
            calculateDimensions();
            goToSlide(currentIndex, false);
        }, 250);
    });

    // Inicialização
    calculateDimensions();
    setTimeout(() => {
        goToSlide(currentIndex, false);
    }, 100);

    // Autoplay
    let autoplayInterval;
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    const interactiveElements = [prevButton, nextButton, track, ...dots].filter(el => el);
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', stopAutoplay);
        el.addEventListener('mouseleave', startAutoplay);
        el.addEventListener('touchstart', stopAutoplay, { passive: true });
        el.addEventListener('touchend', () => setTimeout(startAutoplay, 3000), { passive: true });
    });

    startAutoplay();
}
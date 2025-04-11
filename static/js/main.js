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
    document.querySelectorAll('.service-card a').forEach(button => {
        button.addEventListener('click', function (e) {
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
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    let slideWidth;
    let slidesToShow;
    let maxIndex;

    function calculateDimensions() {
        const container = document.querySelector('.testimonials-container');
        const containerWidth = container ? container.offsetWidth : 0;
        slidesToShow = window.innerWidth >= 768 ? 3 : 1;
        slideWidth = slides[0].offsetWidth || containerWidth / slidesToShow;
        maxIndex = Math.max(0, slides.length - slidesToShow);
    }

    function goToSlide(index) {
        currentIndex = index;
        const translateX = currentIndex * slideWidth;
        track.style.transform = `translateX(-${translateX}px)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle('bg-fatho-gold', i === currentIndex);
            dot.classList.toggle('bg-transparent', i !== currentIndex);
        });

        slides.forEach((slide, i) => {
            const card = slide.querySelector('.testimonial-card');
            if (card) {
                const middleIndex = currentIndex + Math.floor(slidesToShow / 2);
                card.classList.toggle('border-2', i === middleIndex);
                card.classList.toggle('border-fatho-gold', i === middleIndex);
            }
        });

        if (prevButton) prevButton.classList.toggle('opacity-50', currentIndex === 0);
        if (nextButton) nextButton.classList.toggle('opacity-50', currentIndex === maxIndex);
    }

    function updateSlideWidth() {
        calculateDimensions();
        slides.forEach(slide => {
            slide.style.minWidth = `${slideWidth}px`;
        });
        goToSlide(Math.min(currentIndex, maxIndex));
    }

    if (prevButton) {
        prevButton.addEventListener('click', e => {
            e.preventDefault();
            if (currentIndex > 0) goToSlide(currentIndex - 1);
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', e => {
            e.preventDefault();
            if (currentIndex < maxIndex) goToSlide(currentIndex + 1);
        });
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', e => {
            e.preventDefault();
            goToSlide(Math.min(i, maxIndex));
        });
    });

    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const threshold = 50;
        if (touchStartX - touchEndX > threshold && currentIndex < maxIndex) {
            goToSlide(currentIndex + 1);
        } else if (touchEndX - touchStartX > threshold && currentIndex > 0) {
            goToSlide(currentIndex - 1);
        }
    }, { passive: true });

    window.addEventListener('resize', () => {
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(updateSlideWidth, 250);
    });

    let autoplayInterval;
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            currentIndex < maxIndex ? goToSlide(currentIndex + 1) : goToSlide(0);
        }, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    const interactiveElements = [prevButton, nextButton, track, ...dots];
    interactiveElements.forEach(el => {
        if (el) {
            el.addEventListener('mouseenter', stopAutoplay);
            el.addEventListener('mouseleave', startAutoplay);
            el.addEventListener('touchstart', stopAutoplay, { passive: true });
            el.addEventListener('touchend', () => setTimeout(startAutoplay, 3000), { passive: true });
        }
    });

    calculateDimensions();
    setTimeout(() => {
        calculateDimensions();
        goToSlide(0);
        slides.forEach((slide, i) => {
            slide.style.opacity = '0';
            slide.style.transform = 'translateY(20px)';
            setTimeout(() => {
                slide.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                slide.style.opacity = '1';
                slide.style.transform = 'translateY(0)';
            }, 100 + (i * 150));
        });
    }, 500);

    const testimonialsSection = document.getElementById('depoimentos');
    if (testimonialsSection) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('testimonials-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(testimonialsSection);
    }

    startAutoplay();
}

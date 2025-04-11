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

    // Inicialização do carrossel de depoimentos
    initTestimonialsCarousel();
    
    // Função para inicializar o carrossel
    function initTestimonialsCarousel() {
        const track = document.querySelector('.testimonials-track');
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.testimonial-dot');
        const prevButton = document.querySelector('.testimonial-prev');
        const nextButton = document.querySelector('.testimonial-next');
        
        if (!track || slides.length === 0) {
            console.log("Carrossel não encontrado ou sem slides");
            return;
        }
        
        let currentIndex = 0;
        let slideWidth;
        let slidesToShow;
        let maxIndex;
        
        // Função para calcular as dimensões iniciais
        function calculateDimensions() {
            // Precisamos verificar se os slides têm um pai visível
            if (slides[0].offsetWidth === 0) {
                // Se o slide não tiver largura, provavelmente está oculto ou não renderizado completamente
                // Vamos usar o offsetWidth do container e dividir pelo número de slides visíveis
                const container = document.querySelector('.testimonials-container');
                const containerWidth = container ? container.offsetWidth : 0;
                slidesToShow = window.innerWidth >= 768 ? 3 : 1;
                slideWidth = containerWidth / slidesToShow;
            } else {
                slideWidth = slides[0].offsetWidth;
                slidesToShow = window.innerWidth >= 768 ? 3 : 1;
            }
            
            maxIndex = Math.max(0, slides.length - slidesToShow);
            
            console.log(`Calculado: slideWidth=${slideWidth}, slidesToShow=${slidesToShow}, maxIndex=${maxIndex}`);
        }
        
        // Função para atualizar largura dos slides em caso de redimensionamento
        function updateSlideWidth() {
            calculateDimensions();
            
            // Reposiciona o carrossel após redimensionamento
            goToSlide(Math.min(currentIndex, maxIndex));
        }
        
        // Função para ir para o slide específico
        function goToSlide(index) {
            currentIndex = index;
            const translateX = currentIndex * slideWidth;
            console.log(`Movendo para slide ${index}, translateX=${translateX}px`);
            
            // Usar requestAnimationFrame para garantir animação suave
            requestAnimationFrame(() => {
                track.style.transform = `translateX(-${translateX}px)`;
                
                // Atualiza dots
                dots.forEach((dot, i) => {
                    dot.classList.toggle('bg-fatho-gold', i === currentIndex);
                    dot.classList.toggle('bg-transparent', i !== currentIndex);
                });
                
                // Destaca cartão ativo (para visualização mobile)
                slides.forEach((slide, i) => {
                    const card = slide.querySelector('.testimonial-card');
                    if (card) {
                        card.classList.toggle('border-2', i === currentIndex);
                        card.classList.toggle('border-fatho-gold', i === currentIndex);
                    }
                });
                
                // Desabilita botões de navegação quando necessário
                if (prevButton) prevButton.classList.toggle('opacity-50', currentIndex === 0);
                if (nextButton) nextButton.classList.toggle('opacity-50', currentIndex === maxIndex);
            });
        }
        
        // Event Listeners para os controles
        if (prevButton) {
            prevButton.addEventListener('click', function(e) {
                e.preventDefault();
                console.log("Botão Anterior clicado");
                if (currentIndex > 0) {
                    goToSlide(currentIndex - 1);
                }
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', function(e) {
                e.preventDefault();
                console.log("Botão Próximo clicado");
                if (currentIndex < maxIndex) {
                    goToSlide(currentIndex + 1);
                }
            });
        }
        
        // Event Listeners para os dots (paginação)
        dots.forEach((dot, i) => {
            dot.addEventListener('click', function(e) {
                e.preventDefault();
                console.log(`Dot ${i} clicado`);
                goToSlide(Math.min(i, maxIndex));
            });
        });
        
        // Event Listener para swipe em dispositivos móveis
        let touchStartX = 0;
        let touchEndX = 0;
        
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50; // mínimo de pixels para considerar um swipe
            
            if (touchStartX - touchEndX > swipeThreshold) {
                // Swipe para a esquerda - próximo slide
                if (currentIndex < maxIndex) {
                    goToSlide(currentIndex + 1);
                }
            } else if (touchEndX - touchStartX > swipeThreshold) {
                // Swipe para a direita - slide anterior
                if (currentIndex > 0) {
                    goToSlide(currentIndex - 1);
                }
            }
        }
        
        // Atualiza a largura dos slides quando a janela é redimensionada
        window.addEventListener('resize', () => {
            // Debounce para evitar chamadas excessivas durante o redimensionamento
            clearTimeout(window.resizeTimer);
            window.resizeTimer = setTimeout(() => {
                updateSlideWidth();
            }, 250);
        });
        
        // Autoplay (ativado por padrão)
        let autoplayInterval;
        
        function startAutoplay() {
            console.log("Iniciando autoplay");
            autoplayInterval = setInterval(() => {
                if (currentIndex < maxIndex) {
                    goToSlide(currentIndex + 1);
                } else {
                    goToSlide(0); // Volta para o início
                }
            }, 5000); // 5 segundos entre slides
        }
        
        function stopAutoplay() {
            console.log("Parando autoplay");
            clearInterval(autoplayInterval);
        }
        
        // Inicia autoplay
        startAutoplay();
        
        // Pausa quando o usuário interage
        const interactiveElements = [prevButton, nextButton, track];
        if (dots && dots.length) {
            dots.forEach(dot => interactiveElements.push(dot));
        }
        
        interactiveElements.forEach(el => {
            if (el) {
                el.addEventListener('mouseenter', stopAutoplay);
                el.addEventListener('mouseleave', startAutoplay);
                el.addEventListener('touchstart', stopAutoplay, { passive: true });
                el.addEventListener('touchend', () => {
                    setTimeout(startAutoplay, 3000);
                }, { passive: true });
            }
        });
        
        // Calcular dimensões e inicializar
        calculateDimensions();
        
        // Adiar a inicialização para garantir que o DOM está totalmente renderizado
        setTimeout(() => {
            // Recalcular dimensões (para caso o DOM tenha sido atualizado)
            calculateDimensions();
            
            // Inicialização - ir para o primeiro slide
            goToSlide(0);
            
            // Adicionando efeito de entrada com escalonamento
            slides.forEach((slide, index) => {
                slide.style.opacity = '0';
                slide.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    slide.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    slide.style.opacity = '1';
                    slide.style.transform = 'translateY(0)';
                }, 100 + (index * 150));
            });
        }, 500);
    }
    
    // Observe quando a seção de depoimentos entra no viewport para iniciar animações
    const testimonialsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('testimonials-visible');
                testimonialsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    const testimonialsSection = document.getElementById('depoimentos');
    if (testimonialsSection) {
        testimonialsObserver.observe(testimonialsSection);
    }
});
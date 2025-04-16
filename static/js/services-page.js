// Smooth Scroll
document.addEventListener('DOMContentLoaded', function() {
  // Configuração do Scroll Suave
  enableSmoothScroll();
  
  // Inicializar os observadores
  initScrollReveal();
  
  // Inicializar o efeito parallax
  initParallax();
});

// Função para habilitar o scroll suave para toda a página
function enableSmoothScroll() {
  // Adiciona estilos CSS para scroll suave
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Adiciona eventos de clique para links internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });
}

// Função para inicializar o efeito de revelação no scroll
function initScrollReveal() {
  // Seleciona os elementos para revelação
  const revealElements = document.querySelectorAll('.srv-reveal, .srv-card');
  
  // Configuração do Intersection Observer
  const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              // Opcional: parar de observar o elemento depois que ele aparecer
              // revealObserver.unobserve(entry.target);
          }
      });
  }, {
      threshold: 0.15, // Elemento é considerado visível quando 15% dele está visível
      rootMargin: '0px 0px -100px 0px' // Dispara um pouco antes do elemento entrar na viewport
  });
  
  // Adiciona todos os elementos ao observador
  revealElements.forEach(element => {
      revealObserver.observe(element);
  });
}

// Função para inicializar o efeito parallax
function initParallax() {
  const parallaxElements = document.querySelectorAll('.srv-parallax');
  
  let ticking = false;

  window.addEventListener('scroll', function() {
      if (!ticking) {
          window.requestAnimationFrame(function() {
              const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
              
              parallaxElements.forEach(element => {
                  const speed = element.getAttribute('data-speed') || 0.1;
                  const yPos = -(scrollTop * speed);
                  element.style.transform = `translateY(${yPos}px)`;
              });
              
              ticking = false;
          });
          ticking = true;
      }
  });
}


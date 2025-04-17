// Smooth Scroll
document.addEventListener('DOMContentLoaded', function() {
  // Configuração do Scroll Suave
  enableSmoothScroll();
  
  // Inicializar os observadores
  initScrollReveal();
  
  // Inicializar o efeito parallax
  initParallax();
  
  // Inicializar o carregamento otimizado de imagens
  initImageLoading();
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
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
  });
  
  // Adiciona todos os elementos ao observador
  revealElements.forEach(element => {
      revealObserver.observe(element);
  });
}

// Função para inicializar o efeito parallax
function initParallax() {
  const parallaxElements = document.querySelectorAll('.srv-image-container, .srv-content-column');
  
  let ticking = false;

  window.addEventListener('scroll', function() {
      if (!ticking) {
          window.requestAnimationFrame(function() {
              const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
              
              parallaxElements.forEach(element => {
                  const speed = parseFloat(element.getAttribute('data-speed')) || 0.05;
                  const yPos = scrollTop * speed;
                  
                  // Aplica apenas ao background para não afetar o layout
                  element.style.backgroundPositionY = `${yPos}px`;
              });
              
              ticking = false;
          });
          ticking = true;
      }
  });
}

// NOVA FUNÇÃO: Carregamento otimizado de imagens
function initImageLoading() {
  const lazyImages = document.querySelectorAll('.srv-image[data-src]');
  
  if (!lazyImages.length) return;

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const container = img.closest('.srv-image-container');
        const placeholderUrl = container.dataset.placeholder;
        
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        
        img.onload = () => {
          img.classList.add('loaded');
          observer.unobserve(img);
        };
        
        img.onerror = () => {
          img.src = placeholderUrl;
          img.classList.add('loaded');
          observer.unobserve(img);
        };
      }
    });
  }, {
    rootMargin: '200px 0px',
    threshold: 0.01
  });

  lazyImages.forEach(img => {
    const container = img.closest('.srv-image-container');
    const placeholderUrl = container.dataset.placeholder;
    
    img.onerror = () => {
      img.src = placeholderUrl;
      img.classList.add('loaded');
    };
    
    imageObserver.observe(img);
  });
}

// Função global para tratamento de erro
function handleImageError(img) {
  const container = img.closest('.srv-image-container');
  if (container && container.dataset.placeholder) {
      img.src = container.dataset.placeholder;
  } else {
      // Fallback extremo caso o data-placeholder não exista
      img.src = '/static/img/placeholder.png';
  }
  img.classList.add('loaded');
  return true; // Previne loops de erro
}

// Adicione esta função no seu DOMContentLoaded
function equalizeHeights() {
  document.querySelectorAll('.srv-card').forEach(card => {
      const imageCol = card.querySelector('.srv-image-container');
      const contentCol = card.querySelector('.srv-content-column');
      
      if (imageCol && contentCol) {
          // Pega a maior altura entre as colunas
          const maxHeight = Math.max(
              imageCol.offsetHeight, 
              contentCol.offsetHeight
          );
          
          // Aplica a altura máxima a ambas as colunas
          imageCol.style.minHeight = `${maxHeight}px`;
          contentCol.style.minHeight = `${maxHeight}px`;
      }
  });
}

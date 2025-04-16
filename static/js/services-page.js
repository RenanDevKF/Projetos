// services.js

// Lista de serviços
const services = [
    {
      name: "Massagem Relaxante com Pedras Quentes",
      description: "A Massagem Relaxante com Pedras Quentes é uma experiência terapêutica profunda que combina o calor de pedras vulcânicas com toques suaves e envolventes...",
      tagline: "Destaque-se do estresse e entregue-se ao calor que cura.",
      image: "/massage-stones.jpg"
    },
    // ... outros serviços aqui
  ];
  
  // Função para criar um card de serviço
  function createServiceCard(service, index) {
    const isReverse = index % 2 === 1;
    
    const card = document.createElement('div');
    card.className = `flex flex-col md:flex-row gap-8 opacity-0 ${isReverse ? 'md:flex-row-reverse' : ''}`;
    
    card.innerHTML = `
      <div class="md:w-1/2">
        <div class="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
          <img src="${service.image}" alt="${service.name}" class="w-full h-full object-cover">
        </div>
      </div>
      <div class="md:w-1/2 flex flex-col justify-center">
        <h2 class="text-3xl font-bold text-[#333333] mb-4">${service.name}</h2>
        <p class="text-gray-600 mb-4">${service.description}</p>
        <p class="text-lg font-medium text-[#c8a97e] italic">${service.tagline}</p>
        <button class="mt-6 px-6 py-3 bg-[#c8a97e] text-white rounded-lg hover:bg-[#d4b78a] transition-colors shadow-md hover:shadow-xl hover:shadow-[#c8a97e]/30 w-fit">
          Agendar Sessão
        </button>
      </div>
    `;
  
    return card;
  }
  
  // Função para inicializar as animações
  function initializeAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.animate(
              [
                { 
                  opacity: 0, 
                  transform: 'translateY(20px)' 
                },
                { 
                  opacity: 1, 
                  transform: 'translateY(0)' 
                }
              ],
              {
                duration: 500,
                easing: 'ease-out',
                fill: 'forwards'
              }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1
      }
    );
  
    // Observa todos os cards de serviço
    document.querySelectorAll('.service-card').forEach(card => {
      observer.observe(card);
    });
  }
  
  // Função principal para renderizar a página
  function renderServicesPage() {
    const container = document.createElement('div');
    container.className = 'min-h-screen bg-gradient-to-b from-[#f5f9f6] to-white';
  
    // Hero Section
    container.innerHTML = `
      <div class="relative h-[40vh] bg-[#333333] overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 z-10"></div>
        <img src="/massage-hero.jpg" alt="Serviços de Massagem" class="w-full h-full object-cover">
        <div class="absolute inset-0 flex items-center justify-center z-20">
          <div class="text-center">
            <h1 class="text-4xl md:text-6xl font-bold text-white mb-4">Nossos Serviços</h1>
            <p class="text-xl text-white/90">Experiências terapêuticas para seu bem-estar</p>
          </div>
        </div>
      </div>
    `;
  
    // Services Grid
    const servicesGrid = document.createElement('div');
    servicesGrid.className = 'max-w-7xl mx-auto px-4 py-16';
    const grid = document.createElement('div');
    grid.className = 'grid gap-16';
  
    services.forEach((service, index) => {
      const card = createServiceCard(service, index);
      card.classList.add('service-card');
      grid.appendChild(card);
    });
  
    servicesGrid.appendChild(grid);
    container.appendChild(servicesGrid);
  
    // CTA Section
    container.innerHTML += `
      <div class="bg-[#d4e8d9] py-16">
        <div class="max-w-4xl mx-auto px-4 text-center">
          <h2 class="text-3xl font-bold text-[#333333] mb-4">Pronto para começar sua jornada de bem-estar?</h2>
          <p class="text-gray-600 mb-8">Entre em contato conosco e descubra como podemos ajudar você a alcançar o equilíbrio que procura.</p>
          <button class="px-8 py-4 bg-[#c8a97e] text-white rounded-lg hover:bg-[#d4b78a] transition-colors shadow-md hover:shadow-xl hover:shadow-[#c8a97e]/30 text-lg font-medium">
            Agende sua Consulta
          </button>
        </div>
      </div>
    `;
  
    // Adiciona ao DOM e inicializa as animações
    document.body.appendChild(container);
    initializeAnimations();
  }
  
  // Inicializa a página quando o DOM estiver pronto
  document.addEventListener('DOMContentLoaded', renderServicesPage);
  
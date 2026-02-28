// Vanilla Tilt Effect для карточек Features
// Загружаем библиотеку из CDN и инициализируем элементы

(function() {
  // Проверяем, загружена ли уже библиотека
  if (typeof VanillaTilt !== 'undefined') {
    initTilt();
    return;
  }

  // Загружаем vanilla-tilt из CDN
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/vanilla-tilt@1.8.1/dist/vanilla-tilt.min.js';
  script.onload = function() {
    initTilt();
  };
  document.head.appendChild(script);

  function initTilt() {
    // Ждем загрузки DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeTiltElements);
    } else {
      initializeTiltElements();
    }
  }

  function initializeTiltElements() {
    const tiltElements = document.querySelectorAll('.tilt-element');
    
    tiltElements.forEach(element => {
      if (element.vanillaTilt) {
        // Уже инициализирован
        return;
      }

      VanillaTilt.init(element, {
        max: 6,              // Максимальный угол наклона
        speed: 2000,         // Скорость анимации
        glare: true,         // Включить эффект свечения
        'max-glare': 0.2,    // Уменьшенная интенсивность свечения
        'glare-prerender': false,
        reverse: true,       // Обратное направление наклона
        gyroscope: true,     // Использовать гироскоп на мобильных
        scale: 1.02          // Легкое увеличение при наведении
      });
      
      // Кастомизируем цвет glare эффекта
      const glareElement = element.querySelector('.js-tilt-glare-inner');
      if (glareElement) {
        glareElement.style.background = 'linear-gradient(45deg, rgba(203, 166, 247, 0.1), rgba(180, 190, 254, 0.1))';
      }
    });

    console.log('Vanilla Tilt initialized for', tiltElements.length, 'elements');
  }

  // Реинициализация при изменении страницы (для SPA)
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length > 0) {
        // Небольшая задержка для полной загрузки элементов
        setTimeout(initializeTiltElements, 100);
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();

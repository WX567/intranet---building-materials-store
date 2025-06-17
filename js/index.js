document.addEventListener('DOMContentLoaded', function() {
  function animateCounter(element, finalValue, duration = 2000) {
    const startValue = 0;
    const startTime = performance.now();
    const isPercentage = element.textContent.includes('%');
    
    function updateCounter(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentValue = Math.floor(progress * (finalValue - startValue) + startValue);
      
      element.textContent = isPercentage ? `${currentValue}%` : currentValue;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        // Гарантируем точное конечное значение
        element.textContent = isPercentage ? `${finalValue}%` : finalValue;
      }
    }
    
    requestAnimationFrame(updateCounter);
  }

  function initCounters() {
    const counters = document.querySelectorAll('.infographics-headerText');
    
    counters.forEach(counter => {
      const originalText = counter.textContent.trim();
      const numericValue = parseInt(originalText.replace(/\D/g, ''));
      
      // Пропускаем нечисловые значения (например, "24/7")
      if (isNaN(numericValue)) return;
      
      // Сохраняем оригинальное значение в data-атрибут
      counter.dataset.finalValue = originalText;
      
      // Начинаем анимацию с 0
      counter.textContent = originalText.includes('%') ? '0%' : '0';
      
      animateCounter(counter, numericValue);
    });
  }

  // Запускаем при загрузке
  initCounters();

  // И при появлении в области видимости (если страница прокручивается)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.infographics-headerText');
        counters.forEach(counter => {
          if (counter.dataset.finalValue && counter.textContent === '0') {
            const finalValue = parseInt(counter.dataset.finalValue.replace(/\D/g, ''));
            animateCounter(counter, finalValue);
          }
        });
      }
    });
  }, { threshold: 0.1 });

  const section = document.querySelector('.infographics');
  if (section) observer.observe(section);
}); 
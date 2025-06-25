document.addEventListener('DOMContentLoaded', function() {
  // Функция анимации числа
  function animateNumber(element, targetNumber) {
    let currentNumber = 0;
    const duration = 2000; // 2 секунды на всю анимацию
    const steps = 50; // Количество шагов анимации
    const stepTime = duration / steps;
    const increment = targetNumber / steps;
    const isPercent = element.textContent.includes('%');

    const timer = setInterval(function() {
      currentNumber = Math.min(currentNumber + increment, targetNumber);
      element.textContent = isPercent ? 
        Math.round(currentNumber) + '%' : 
        Math.round(currentNumber);
      
      if (currentNumber >= targetNumber) {
        clearInterval(timer);
      }
    }, stepTime);
  }

  // Запуск анимации для всех счетчиков
  function startCounters() {
    const counters = document.querySelectorAll('.infographics-headerText');
    
    counters.forEach(function(counter) {
      // Если анимация уже была запущена - пропускаем
      if (counter.dataset.animated === 'true') return;
      
      const text = counter.textContent.trim();
      const number = parseInt(text.replace(/\D/g, ''));
      
      if (!isNaN(number)) {
        counter.dataset.original = text; // Сохраняем оригинальный текст
        counter.textContent = text.includes('%') ? '0%' : '0';
        counter.dataset.animated = 'true'; // Помечаем как анимированный
        animateNumber(counter, number);
      }
    });
  }

  // Проверяем, виден ли блок
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // Проверяем при загрузке и при прокрутке
  function checkCountersVisibility() {
    const section = document.querySelector('.infographics');
    if (section && isElementInViewport(section)) {
      startCounters();
      // Удаляем обработчик после запуска
      window.removeEventListener('scroll', checkCountersVisibility);
    }
  }

  // Запускаем проверку при загрузке и при прокрутке
  checkCountersVisibility();
  window.addEventListener('scroll', checkCountersVisibility);
});

// Слайдер ------------------------------------

// Получаем элементы слайдера
const slider = document.querySelector('.slides');
const slides = document.querySelectorAll('.slide');

let currentSlide = 0;

// Функция для переключения слайдов
function moveSlider() {

  currentSlide++;

  // Если дошли до конца - возвращаемся к первому слайду
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  // Перемещаем слайдер
  slider.style.transform = 'translateX(-' + (currentSlide * 33.33) + '%)';
}

// Запускаем автоматическое переключение каждые 3 секунды
setInterval(moveSlider, 3000);  
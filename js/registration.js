document.addEventListener('DOMContentLoaded', function() {
    const regForm = document.getElementById('reg_Form');
    const inputs = regForm.querySelectorAll('input');
    const registerBtn = regForm.querySelector('.bt-register');
    const backBtn = regForm.querySelector('.bt-back');
    const loginBtn = regForm.querySelector('.bt-login');

    // Валидация полей
    function validateField(input, type) {
        const value = input.value.trim();
        
        switch(type) {
            case 'text':
                // Проверка ФИО (только буквы, минимум 2 символа)
                return /^[а-яА-ЯёЁa-zA-Z]{2,}$/.test(value);
            case 'email':
                // Проверка email
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            case 'phone':
                // Проверка телефона (минимум 10 цифр)
                return /^\d{10,}$/.test(value);
            case 'password':
                // Пароль минимум 6 символов
                return value.length >= 6;
            default:
                return false;
        }
    }

    // Показать ошибку
    function showError(input, message) {
        // Удаляем старую ошибку если есть
        const oldError = input.parentNode.querySelector('.error-message');
        if (oldError) oldError.remove();
        
        // Создаем элемент с ошибкой
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        input.parentNode.appendChild(error);
        input.classList.add('invalid');
    }

    // Убрать ошибку
    function clearError(input) {
        const error = input.parentNode.querySelector('.error-message');
        if (error) error.remove();
        input.classList.remove('invalid');
    }

    // Проверка всех полей при клике на регистрацию
    registerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        let isValid = true;

        // Проверяем все поля
        inputs.forEach(input => {
            const type = input.type === 'number' ? 
                (input.previousElementSibling.textContent.includes('Телефон') ? 'phone' : 'password') : 
                (input.previousElementSibling.textContent.includes('почты') ? 'email' : 'text');
            
            if (!input.value.trim()) {
                showError(input, 'Поле обязательно для заполнения');
                isValid = false;
            } else if (!validateField(input, type)) {
                let message = '';
                switch(type) {
                    case 'text': 
                        message = 'Только буквы, минимум 2 символа'; 
                        break;
                    case 'email': 
                        message = 'Введите корректный email'; 
                        break;
                    case 'phone': 
                        message = 'Минимум 10 цифр'; 
                        break;
                    case 'password': 
                        message = 'Минимум 6 символов'; 
                        break;
                }
                showError(input, message);
                isValid = false;
            } else {
                clearError(input);
            }
        });

        // Если все поля валидны
        if (isValid) {
            alert('Регистрация успешна!');
            // Здесь можно отправить форму на сервер
            // regForm.submit();
        }
    });

    // Обработчики для кнопок
    backBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.history.back();
    });

    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = '/Интернет-магазинСМ/login.html';
    });

    // Валидация при вводе
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const type = this.type === 'number' ? 
                (this.previousElementSibling.textContent.includes('Телефон') ? 'phone' : 'password') : 
                (this.previousElementSibling.textContent.includes('почты') ? 'email' : 'text');
            
            if (this.value.trim() && !validateField(this, type)) {
                this.classList.add('invalid');
            } else {
                clearError(this);
            }
        });
    });
});
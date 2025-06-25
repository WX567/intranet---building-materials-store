document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reg_Form');
    const inputs = form.querySelectorAll('input');
    
    // Проверка при отправке формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let allValid = true;
        
        inputs.forEach(input => {
            const value = input.value.trim();
            let isValid = true;
            let errorMsg = '';
            
            // Проверка пустого поля
            if (!value) {
                errorMsg = 'Поле обязательно для заполнения';
                isValid = false;
            } 
            // Проверка ФИО
            else if (input.type === 'text' && !/^[а-яА-ЯёЁa-zA-Z]{2,}$/.test(value)) {
                errorMsg = 'Только буквы, минимум 2 символа';
                isValid = false;
            }
            // Проверка email
            else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                errorMsg = 'Введите корректный email';
                isValid = false;
            }
            // Проверка телефона
            else if (input.type === 'tel' && !/^\d{10,}$/.test(value)) {
                errorMsg = 'Минимум 10 цифр';
                isValid = false;
            }
            // Проверка пароля
            else if (input.type === 'password' && value.length < 6) {
                errorMsg = 'Минимум 6 символов';
                isValid = false;
            }
            
            // Показ ошибки
            showError(input, errorMsg);
            if (!isValid) allValid = false;
        });
        
        if (allValid) {
            alert('Форма успешно отправлена!');
            // form.submit(); // Раскомментировать для реальной отправки
        }
    });
    
    // Проверка при вводе
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            showError(this, '');
        });
    });
    
    // Функция показа ошибки
    function showError(input, message) {
        let error = input.nextElementSibling;
        
        // Создаем элемент ошибки если его нет
        if (!error || !error.classList.contains('error-message')) {
            error = document.createElement('div');
            error.className = 'error-message';
            input.parentNode.appendChild(error);
        }
        
        error.textContent = message;
        input.classList.toggle('invalid', message !== '');
    }
    
    // Обработчики кнопок
    document.querySelector('.bt-back').addEventListener('click', function() {
        window.history.back();
    });
    
    document.querySelector('.bt-login').addEventListener('click', function() {
        window.location.href = '/Интернет-магазинСМ/login.html';
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('log_Form');
    const emailInput = loginForm.querySelector('input[type="text"]:first-of-type');
    const passwordInput = loginForm.querySelector('input[type="text"]:last-of-type');
    const loginButton = loginForm.querySelector('.bt-login');

    // Функция проверки email/логина
    function validateEmail(email) {
        // Проверка на email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Проверка на логин (минимум 3 символа)
        const loginRegex = /^[a-zA-Z0-9_]{3,}$/;
        
        return emailRegex.test(email) || loginRegex.test(email);
    }

    // Функция проверки пароля
    function validatePassword(password) {
        // Пароль должен содержать минимум 6 символов
        return password.length >= 6;
    }

    // Обработчик клика по кнопке входа
    loginButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        let isValid = true;

        // Сброс предыдущих ошибок
        resetErrors();

        // Проверка email/логина
        if (!email) {
            showError(emailInput, 'Поле обязательно для заполнения');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError(emailInput, 'Введите корректный email или логин');
            isValid = false;
        }

        // Проверка пароля
        if (!password) {
            showError(passwordInput, 'Поле обязательно для заполнения');
            isValid = false;
        } else if (!validatePassword(password)) {
            showError(passwordInput, 'Пароль должен содержать минимум 6 символов');
            isValid = false;
        }

        // Если все проверки пройдены
        if (isValid) {
            alert('Форма успешно отправлена!');
            // Здесь можно добавить отправку формы на сервер
            // loginForm.submit();
        }
    });

    // Функция отображения ошибки
    function showError(input, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '12px';
        errorElement.style.marginTop = '5px';
        errorElement.textContent = message;
        
        input.parentNode.appendChild(errorElement);
        input.style.borderColor = 'red';
    }

    // Функция сброса ошибок
    function resetErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        
        const inputs = loginForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.style.borderColor = '';
        });
    }

    // Обработчик для кнопки "Назад"
    const backButton = loginForm.querySelector('.bt-back');
    backButton.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Возврат на предыдущую страницу');
    });
});
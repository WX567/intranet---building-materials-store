document.getElementById('log_Form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Получаем значения полей
  const login = document.getElementById('loginInput').value;
  const password = document.getElementById('passwordInput').value;
  
  // Элементы для отображения ошибок
  const loginError = document.getElementById('loginError');
  const passwordError = document.getElementById('passwordError');
  
  // Сбрасываем предыдущие ошибки
  loginError.style.display = 'none';
  passwordError.style.display = 'none';
  
  // Проверка логина (только английские буквы и цифры)
  const loginRegex = /^[a-zA-Z0-9]+$/;
  if (!loginRegex.test(login)) {
    loginError.style.display = 'block';
    return false;
  }
  
  // Проверка пароля (английские буквы, цифры и не менее 6 символов)
  const passwordRegex = /^[a-zA-Z0-9]{6,}$/;
  if (!passwordRegex.test(password)) {
    passwordError.style.display = 'block';
    return false;
  }
  
  // Если все проверки пройдены, можно отправлять форму
  alert('Форма успешно отправлена!');
  // Здесь можно добавить отправку формы на сервер
  // this.submit();
});

// Дополнительная проверка при вводе (опционально)
document.getElementById('loginInput').addEventListener('input', function() {
  const loginError = document.getElementById('loginError');
  const loginRegex = /^[a-zA-Z0-9]*$/;
  
  if (!loginRegex.test(this.value)) {
    loginError.style.display = 'block';
  } else {
    loginError.style.display = 'none';
  }
});

document.getElementById('passwordInput').addEventListener('input', function() {
  const passwordError = document.getElementById('passwordError');
  const passwordRegex = /^[a-zA-Z0-9]{0,}$/;
  
  if (!passwordRegex.test(this.value)) {
    passwordError.style.display = 'block';
    passwordError.textContent = 'Пароль должен содержать только английские буквы и цифры';
  } else if (this.value.length > 0 && this.value.length < 6) {
    passwordError.style.display = 'block';
    passwordError.textContent = 'Пароль должен быть не менее 6 символов';
  } else {
    passwordError.style.display = 'none';
  }
});
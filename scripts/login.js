document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Запобігаємо стандартному відправленню форми, щоб не оновлювалася сторінка

    // Отримуємо значення з полів форми
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Перевіряємо, чи введено правильне ім'я користувача та пароль
    if (username === 'user' && password === 'password') {
        // Якщо дані правильні, виводимо повідомлення про успішний вхід і перенаправляємо на головну сторінку
        alert('Успішний вхід!');
        window.location.href = 'main.html'; // Перенаправлення на головну сторінку
    } else {
        // Якщо ім'я користувача або пароль неправильні, виводимо повідомлення про помилку
        alert('Неправильне ім’я користувача або пароль.');
    }
});

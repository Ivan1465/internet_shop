const users = []; // Масив для збереження зареєстрованих користувачів

document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Забороняємо стандартну поведінку форми (оновлення сторінки)

    // Отримуємо значення з полів форми
    const newUsername = document.getElementById('new-username').value.trim();
    const newEmail = document.getElementById('new-email').value.trim();
    const newTelephone = document.getElementById('new-telephone').value.trim();
    const newPassword = document.getElementById('new-password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    // Перевірка імені користувача
    if (/\d/.test(newUsername)) {
        alert('Ім\'я не може містити цифр!');
        return;
    }

    // Перевірка наявності email
    if (users.some(user => user.email === newEmail)) {
        alert('Користувач з таким email вже існує!');
        return;
    }

    // Перевірка довжини пароля
    if (newPassword.length < 8) {
        alert('Пароль повинен містити не менше 8 символів!');
        return;
    }

    // Перевірка на збіг паролів
    if (newPassword !== confirmPassword) {
        alert('Паролі не співпадають!');
        return;
    }

    // Додавання нового користувача до масиву
    const newUser = {
        username: newUsername,
        email: newEmail,
        telephone: newTelephone,
        password: newPassword // У реальному проекті краще використовувати хешування
    };
    users.push(newUser);

    alert(`Користувач ${newUsername} успішно зареєстрований!`);
    console.log('Зареєстровані користувачі:', users);

    // Очистити форму
    document.getElementById('register-form').reset();

    // Перенаправлення на сторінку входу
    window.location.href = 'login.html';

    // Відправка запиту на сервер
    fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
    }).then(response => {
        if (response.ok) {
            alert('Реєстрація успішна!');
            window.location.href = 'login.html'; // Перенаправлення
        } else {
            response.json().then(data => alert(data.message));
        }
    }).catch(error => {
        console.error('Помилка:', error);
        alert('Виникла помилка при реєстрації.');
    });
});

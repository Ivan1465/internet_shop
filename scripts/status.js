document.addEventListener('DOMContentLoaded', () => {
    const basePath = "http://localhost:3000";

    // Мокові (тестові) дані замовлень
    let mockOrders = [
        {
            id: "12345", // Унікальний ідентифікатор замовлення
            statuses: [ // Масив статусів для замовлення
                "Замовлення прийнято",
                "В роботі",
                "Доставлено",
                "Приїхало"
            ]
        },
        {
            id: "67890", // Унікальний ідентифікатор замовлення
            statuses: [ // Масив статусів для іншого замовлення
                "Замовлення прийнято",
                "В роботі"
            ]
        }
    ];
    fetch(basePath + '/orders') // або вкажіть повну URL, напр. http://localhost:3000/products
        .then(response => response.json())
        .then(data => {
            mockOrders = data;
            console.log(mockOrders);
        })
        .catch(error => {
            console.error('Помилка завантаження orders:', error);
            // productsContainer.innerHTML = '<p>Не вдалося завантажити продукти.</p>';
        });

    // HTML-елементи для взаємодії
    const searchInput = document.getElementById('order-search'); // Поле введення ID замовлення
    const searchButton = document.getElementById('search-button'); // Кнопка для пошуку
    const orderStatusSection = document.getElementById('order-status'); // Секція для відображення статусів
    const statusList = document.getElementById('status-list'); // Список статусів замовлення
    const orderIdSpan = document.getElementById('order-id').querySelector('span'); // Місце для відображення ID замовлення
    const errorMessage = document.getElementById('error-message'); // Повідомлення про помилку, якщо замовлення не знайдено

    // Обробник кліку на кнопку "Пошук"
    searchButton.addEventListener('click', () => {
        const orderId = searchInput.value.trim(); // Отримання значення ID замовлення з поля введення
        const order = mockOrders.find(o => o.id === orderId); // Пошук замовлення в масиві

        if (order) { // Якщо замовлення знайдено
            errorMessage.style.display = 'none'; // Приховуємо повідомлення про помилку
            orderIdSpan.textContent = order.id; // Виводимо ID замовлення
            statusList.innerHTML = ''; // Очищуємо список статусів

            // Відображення кожного статусу замовлення
            order.statuses.forEach((status, index) => {
                const li = document.createElement('li'); // Створення елемента списку
                li.textContent = status; // Додавання тексту статусу
                li.className = 'status'; // Додавання загального класу для стилізації
                if (index < order.statuses.length - 1) {
                    li.classList.add('completed'); // Якщо статус завершений, додаємо клас "completed"
                } else {
                    li.classList.add('active'); // Якщо статус останній (активний), додаємо клас "active"
                }
                statusList.appendChild(li); // Додаємо елемент списку до HTML
            });

            orderStatusSection.style.display = 'block'; // Відображаємо секцію статусів
        } else { // Якщо замовлення не знайдено
            orderStatusSection.style.display = 'none'; // Приховуємо секцію статусів
            errorMessage.style.display = 'block'; // Відображаємо повідомлення про помилку
        }
    });
});

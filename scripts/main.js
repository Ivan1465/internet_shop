document.addEventListener('DOMContentLoaded', () => {
    // Масив товарів з даними про ідентифікатор, назву, ціну та зображення
    const products = [
        { id: 1, name: 'Ноутбук Acer Aspire 5', price: 27000, image: 'image/Ноутбук Acer Aspire 5 A515.webp' },
        { id: 2, name: 'Відеокарта Gigabyte PCI-Ex GeForce RTX 4060', price: 19999, image: 'image/Відеокарта Gigabyte PCI-Ex GeForce RTX 4060 Ti Eagle OC ICE 8GB GDDR6 (128bit) (2550 on 18000) (2 x HDMI, 2 x DisplayPort) (GV-N406TEAGLEOC ICE-8GD).webp' },
        { id: 3, name: 'Процесор Intel Core i7-14700 2.1GHz/33MB (BX8071514700) s1700 BOX', price: 19076, image: 'image/Процесор Intel Core i7-14700 2.1GHz 33MB (BX8071514700) s1700 BO.webp' },
    ];

    const productsContainer = document.getElementById('products-container'); // Контейнер для відображення товарів

    // Додаємо кожен товар в контейнер
    products.forEach(product => {
        // Створюємо елемент для кожного товару
        const productElement = document.createElement('div');
        productElement.classList.add('product'); // Додаємо клас для стилізації

        // Додаємо HTML контент для товару (зображення, назва, ціна, кнопка)
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>Ціна: ${product.price} грн</p>
            <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Додати до корзини</button>
        `;
        
        // Додаємо елемент товару в контейнер
        productsContainer.appendChild(productElement);
    });

    // Обробка кліку на кнопку "Додати до корзини"
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) { // Якщо натиснута кнопка "Додати до корзини"
            // Отримуємо дані товару з атрибутів кнопки
            const productId = e.target.dataset.id;
            const productName = e.target.dataset.name;
            const productPrice = Number(e.target.dataset.price); // Перетворюємо ціну на число

            // Отримуємо корзину з localStorage або створюємо порожній масив, якщо корзина пуста
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // Шукаємо товар в корзині
            const existingProduct = cart.find(item => item.id === productId);

            if (existingProduct) { // Якщо товар вже є в корзині
                existingProduct.quantity += 1; // Збільшуємо кількість на 1
            } else { // Якщо товар ще немає в корзині
                // Додаємо новий товар в корзину
                cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }

            // Зберігаємо оновлену корзину в localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Виводимо повідомлення про успішне додавання товару
            alert(`Товар "${productName}" додано до корзини!`);
        }
    });
});

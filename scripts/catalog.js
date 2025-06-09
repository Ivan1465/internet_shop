document.addEventListener('DOMContentLoaded', () => {
    const basePath = "http://localhost:3000";

    // Массив продуктів з деталями
    let products = [];
    products = [
        { id: 1, name: 'Ноутбук Acer Aspire 5 A515', category: 'laptops', price: 27000, image: 'image/Ноутбук Acer Aspire 5 A515.webp' },
        { id: 2, name: 'Ноутбук Dell Vostro 15 3520', category: 'laptops', price: 17999, image: 'image/Ноутбук Dell Vostro 15 3520.webp' },
        { id: 3, name: 'Ноутбук ASUS TUF Gaming F15', category: 'laptops', price: 35999, image: 'image/Ноутбук ASUS TUF Gaming F15.webp' },
        { id: 4, name: 'Ноутбук Lenovo IdeaPad 3 15IAU7', category: 'laptops', price: 27999, image: 'image/Ноутбук Lenovo IdeaPad 3 15IAU7.webp' },
        { id: 5, name: 'Системний блок ARTLINE Gaming DRGN (DRGNv19) Powered by MSI', category: 'desktops', price: 46400, image: 'image/ARTLINE Gaming DRGN (DRGNv19) Powered by MSI.webp' },
        { id: 6, name: 'Системный блок Dell Vostro 3888 MT / i5-10400v', category: 'desktops', price: 27027, image: 'image/Dell Vostro 3888 MT.webp' },
        { id: 7, name: 'Монітор Samsung Odyssey G5', category: 'monitors', price: 10999, image: 'image/Монітор 32 Samsung Odyssey.webp' },
        { id: 8, name: 'Монітор LG UltraGear 27GS75Q-B', category: 'monitors', price: 9999, image: 'image/LG UltraGear 27GS75Q-B.webp' },
        { id: 9, name: 'Монітор Asus 27" VY279HF', category: 'monitors', price: 5122, image: 'image/Монітор Asus 27 VY279HF.webp' },
        { id: 10, name: 'Відеокарта Gigabyte PCI-Ex GeForce RTX 4060 Ti Eagle OC ICE 8GB GDDR6', category: 'graphics', price: 19999, image: 'image/Відеокарта Gigabyte PCI-Ex GeForce RTX 4060 Ti Eagle OC ICE 8GB GDDR6 (128bit) (2550 on 18000) (2 x HDMI, 2 x DisplayPort) (GV-N406TEAGLEOC ICE-8GD).webp' },
        { id: 11, name: 'Відеокарта Gigabyte PCI-Ex Radeon RX 7600 Gaming OC 8GB GDDR6', category: 'graphics', price: 14109, image: 'image/Відеокарта Gigabyte PCI-Ex Radeon RX 7600 Gaming OC 8GB GDDR6 (128bit) (18000) (2 x HDMI, 2 x DisplayPort) (GV-R76GAMING OC-8GD).webp' },
        { id: 12, name: 'Відеокарта Gigabyte PCI-Ex GeForce RTX 3050 Windforce OC V2 6G 6GB GDDR6', category: 'graphics', price: 8499, image: 'image/Відеокарта Gigabyte PCI-Ex GeForce RTX 3050 Windforce OC V2 6G 6GB GDDR6 (96bit) (1477 on 14000) (2 x HDMI, 2 x DisplayPort) (GV-N3050WF2OCV2-6GD).webp' },
        { id: 13, name: 'Відеокарта ASRock PCI-Ex Radeon RX 6600 Challenger D 8GB GDDR6', category: 'graphics', price: 12499, image: 'image/Відеокарта ASRock PCI-Ex Radeon RX 6600 Challenger D 8GB GDDR6 (128bit) (1626on14000) (HDMI, 3 x DisplayPort) (RX6600 CLD 8G).webp' },
        { id: 14, name: 'Процесор AMD Ryzen 5 5600X 3.7 GHz / 32 MB', category: 'processors', price: 5599, image: 'image/Процесор AMD Ryzen 5 5600X 3.7 GHz  32 MB (100-100000065BOX) sAM4 BOX.webp' },
        { id: 15, name: 'Процесор Intel Core i7-14700 2.1GHz/33MB', category: 'processors', price: 19076, image: 'image/Процесор Intel Core i7-14700 2.1GHz 33MB (BX8071514700) s1700 BO.webp' },
        { id: 16, name: 'Клавіатура LOGITECH MX Keys S, Wireless', category: 'keyboards', price: 5099, image: 'image/Клавіатура LOGITECH MX Keys S, Wireless, Ukr, Graphite (L920-011593).webp' },
        { id: 17, name: 'Клавіатура дротова Razer BlackWidow V3 TKL', category: 'keyboards', price: 4799, image: 'image/Клавіатура дротова Razer BlackWidow V3 TKL Razer Green USB RU (RZ03-03490700-R3R1).webp' },
        { id: 18, name: 'Миша Logitech G Pro X Superlight Wireless', category: 'computer mouse', price: 4399, image: 'image/Миша Logitech G Pro X Superlight Wireless.webp' }
    ];
    // Завантаження продуктів з бекенду
    fetch(basePath + '/products') // або вкажіть повну URL, напр. http://localhost:3000/products
        .then(response => response.json())
        .then(data => {
            products = data;
            renderProducts(products);
        })
        .catch(error => {
            console.error('Помилка завантаження продуктів:', error);
            productsContainer.innerHTML = '<p>Не вдалося завантажити продукти.</p>';
        });
    // console.log(products);

    // Оновлені елементи DOM
    const productsContainer = document.getElementById('products-container');
    const searchInput = document.getElementById('search');
    const categoryFilter = document.getElementById('category-filter');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');

    // Функція рендеринга продуктів на основі відфільтрованих результатів
    const renderProducts = (filteredProducts) => {
        productsContainer.innerHTML = ''; // Очищення контейнера перед рендерингом нових продуктів
        filteredProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" />
                <h3>${product.name}</h3>
                <p>Ціна: ${product.price} грн</p>
                <button class="add-to-cart" data-id="${product.id}">Додати до корзини</button>
            `;
            productsContainer.appendChild(productElement); // Додаємо продукт у контейнер
        });
    };

    // Фільтрація продуктів за пошуковим запитом, категорією та ціною
    const filterProducts = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const minPrice = parseInt(minPriceInput.value, 10);
        const maxPrice = parseInt(maxPriceInput.value, 10);

        // Фільтрація на основі категорії, пошукового запиту та діапазону цін
        const filtered = products.filter(product => {
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            const matchesSearch = product.name.toLowerCase().includes(searchTerm);
            const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
            return matchesCategory && matchesSearch && matchesPrice;
        });
        renderProducts(filtered); // Рендерим фільтровані продукти
    };

    // Слухачі подій для кожного з елементів фільтрації
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    minPriceInput.addEventListener('input', filterProducts);
    maxPriceInput.addEventListener('input', filterProducts);

    renderProducts(products); // Рендеринг усіх продуктів на початку

    // Обробка події додавання продуктів до кошика
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id, 10);
            const product = products.find(p => p.id === productId); // Знаходимо продукт за ID

            if (!product) {
                alert('Товар не знайдено.');
                return;
            }

            let cart = JSON.parse(localStorage.getItem('cart')) || []; // Отримуємо кошик з localStorage
            const existingItem = cart.find(item => item.id === product.id); // Перевіряємо чи товар вже в кошику

            if (existingItem) {
                existingItem.quantity += 1; // Якщо є, збільшуємо кількість
            } else  {
                cart.push({ ...product, quantity: 1 }); // Якщо немає, додаємо новий товар в кошик
            }

            localStorage.setItem('cart', JSON.stringify(cart)); // Оновлюємо кошик в localStorage
            alert(`Товар "${product.name}" додано до корзини!`);
        }
    });
});

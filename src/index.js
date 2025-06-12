const express = require('express');
const cors = require('cors'); // ✅ Імпортуємо
const productRoutes = require('./productRoutes'); // Шлях до файлу з роутами для продуктів
const ordersRoutes = require('./orderRoutes'); // Шлях до файлу з роутами для замовлень

const app = express();

// ✅ Дозволити CORS для усіх запитів
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || origin === 'null') {
            callback(null, true); // дозволити запити без origin або з origin null
        } else {
            callback(null, true); // або додайте перевірку для власного домену
        }
    }
}));

// Підключення статичних файлів
const staticPath = 'C:/Users/Іван/OneDrive/Рабочий стол/Інтерент магазин';
app.use(express.static(staticPath));

// Підключення роутів
app.use('/products', productRoutes); // Роутинг продуктів
app.use('/orders', ordersRoutes);    // Роутинг замовлень
app.use('/viddilenya', ordersRoutes); // Приклад для іншого типу роутів

// Основна сторінка
app.get('/', (req, res) => {
    res.sendFile('main.html', { root: staticPath }); // Відправка головної HTML-сторінки
});

// Запуск сервера
const POST = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});




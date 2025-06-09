const db = require('./db'); // шлях до твоєї конфігурації бази

const statusController = {
    // Отримати всі статуси
    getAll: (req, res) => {
        db.query('SELECT * FROM internet_shop.status', (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    },

    // Отримати статус за ID
    getById: (req, res) => {
        const id = req.params.id;
        db.query('SELECT * FROM internet_shop.status WHERE id = ?', [id], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length === 0) return res.status(404).json({ message: 'Статус не знайдено' });
            res.json(results[0]);
        });
    },

    // Створити новий статус
    create: (req, res) => {
        const { name } = req.body;
        db.query('INSERT INTO internet_shop.status (name) VALUES (?)', [name], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Статус створено', id: result.insertId });
        });
    },

    // Оновити статус
    update: (req, res) => {
        const id = req.params.id;
        const { name } = req.body;
        db.query('UPDATE internet_shop.status SET name = ? WHERE id = ?', [name, id], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Статус оновлено' });
        });
    },

    // Видалити статус
    delete: (req, res) => {
        const id = req.params.id;
        db.query('DELETE FROM internet_shop.status WHERE id = ?', [id], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Статус видалено' });
        });
    }
};

module.exports = statusController;

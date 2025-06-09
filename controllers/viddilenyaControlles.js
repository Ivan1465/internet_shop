const db = require('./db'); // шляхи як у тебе

const viddilenyaController = {
    // Отримати всі відділення
    getAll: (req, res) => {
        db.query('SELECT * FROM internet_shop.viddilenya', (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    },

    // Отримати відділення за ID
    getById: (req, res) => {
        const id = req.params.id;
        db.query('SELECT * FROM internet_shop.viddilenya WHERE id = ?', [id], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length === 0) return res.status(404).json({ message: 'Відділення не знайдено' });
            res.json(results[0]);
        });
    },

    // Створити нове відділення
    create: (req, res) => {
        const { name } = req.body;
        db.query('INSERT INTO internet_shop.viddilenya (name) VALUES (?)', [name], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Відділення створено', id: result.insertId });
        });
    },

    // Оновити відділення
    update: (req, res) => {
        const id = req.params.id;
        const { name } = req.body;
        db.query('UPDATE internet_shop.viddilenya SET name = ? WHERE id = ?', [name, id], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Відділення оновлено' });
        });
    },

    // Видалити відділення
    delete: (req, res) => {
        const id = req.params.id;
        db.query('DELETE FROM internet_shop.viddilenya WHERE id = ?', [id], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Відділення видалено' });
        });
    }
};

module.exports = viddilenyaController;

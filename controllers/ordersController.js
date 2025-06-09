const db = require('./db'); // adjust path to your DB config


const productController = {
    // Get all products
    getAll: (req, res) => {
        db.query('SELECT * FROM internet_shop.orders_view', (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    },

    // Get a product by ID
    getById: (req, res) => {
        const id = req.params.id;
        db.query('SELECT * FROM internet_shop.orders_view WHERE id = ?', [id], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length === 0) return res.status(404).json({ message: 'Product not found' });
            res.json(results[0]);
        });
    },
};

module.exports = productController;




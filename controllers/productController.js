const db = require('./db'); // adjust path to your DB config

const productController = {
    // Get all products
    getAll: (req, res) => {
        db.query('SELECT * FROM internet_shop.product', (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    },

    // Get a product by ID
    getById: (req, res) => {
        const id = req.params.id;
        db.query('SELECT * FROM internet_shop.product WHERE id = ?', [id], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length === 0) return res.status(404).json({ message: 'Product not found' });
            res.json(results[0]);
        });
    },

    // Create a new product
    create: (req, res) => {
        const { name, price, image, category } = req.body;
        const query = 'INSERT INTO product (name, price, image, category) VALUES (?, ?, ?, ?)';
        db.query(query, [name, price, image, category], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Product created', productId: result.insertId });
        });
    },

    // Update a product
    update: (req, res) => {
        const id = req.params.id;
        const { name, price, image, category } = req.body;
        const query = 'UPDATE internet_shop.product SET name = ?, price = ?, image = ?, category = ? WHERE id = ?';
        db.query(query, [name, price, image, category, id], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Product updated' });
        });
    },

    // Delete a product
    delete: (req, res) => {
        const id = req.params.id;
        db.query('DELETE FROM internet_shop.product WHERE id = ?', [id], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Product deleted' });
        });
    }
};

module.exports = productController;

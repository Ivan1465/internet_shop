const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController'); // adjust path if needed

router.get('/', ordersController.getAll);
router.get('/:id', ordersController.getById);

module.exports = router;

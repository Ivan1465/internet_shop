const express = require('express');
const router = express.Router();
const statusController = require('./statusController');

router.get('/', statusController.getAll);
router.get('/:id', statusController.getById);
router.post('/', statusController.create);
router.put('/:id', statusController.update);
router.delete('/:id', statusController.delete);

module.exports = router;

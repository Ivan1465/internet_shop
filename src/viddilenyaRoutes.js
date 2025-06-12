const express = require('express');
const router = express.Router();
const viddilenyaController = require('./viddilenyaController');

router.get('/', viddilenyaController.getAll);
router.get('/:id', viddilenyaController.getById);
router.post('/', viddilenyaController.create);
router.put('/:id', viddilenyaController.update);
router.delete('/:id', viddilenyaController.delete);

module.exports = router;

const express = require('express');
const router = express.Router();
const tratamientoController = require('../controllers/tratamientoController');

router.get('/', tratamientoController.getTratamientos);
router.post('/', tratamientoController.createTratamiento);
router.put('/:id', tratamientoController.updateTratamiento); // Nueva
router.delete('/:id', tratamientoController.deleteTratamiento);

module.exports = router;
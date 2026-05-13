const express = require('express');
const router = express.Router();
const tratamientoController = require('../controllers/tratamientoController');
const verifyRole = require('../middlewares/roleAuth');

// Gestión del catálogo de servicios
router.get('/', tratamientoController.obtenerTratamientos);
router.post('/', verifyRole(['admin']), tratamientoController.crearTratamiento);

// Actualización y borrado
router.put('/:id', verifyRole(['admin']), tratamientoController.actualizarTratamiento);
router.delete('/:id', verifyRole(['admin']), tratamientoController.eliminarTratamiento);

module.exports = router;
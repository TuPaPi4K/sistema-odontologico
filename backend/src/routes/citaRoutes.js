const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');

// Registro de la transacción (Movimiento)
router.post('/', citaController.registrarCita);

// Consulta de movimientos realizados
router.get('/', citaController.obtenerCitas);

module.exports = router;
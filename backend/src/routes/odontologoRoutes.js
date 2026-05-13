const express = require('express');
const router = express.Router();
const odontologoController = require('../controllers/odontologoController');
const verifyRole = require('../middlewares/roleAuth');

// Rutas maestras de Odontólogos
router.get('/', odontologoController.obtenerOdontologos);
router.post('/', odontologoController.crearOdontologo);

// Protección de rango
router.put('/:id', verifyRole(['admin']), odontologoController.actualizarOdontologo);
router.delete('/:id', verifyRole(['admin']), odontologoController.eliminarOdontologo);

module.exports = router;
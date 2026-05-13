const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');
const verifyRole = require('../middlewares/roleAuth');

// Consultar y Crear (Asistente y Admin)
router.get('/', pacienteController.obtenerPacientes);
router.post('/', pacienteController.crearPaciente);

// Modificar y Eliminar (Solo ADMIN para asegurar integridad)
router.put('/:id', verifyRole(['admin']), pacienteController.actualizarPaciente);
router.delete('/:id', verifyRole(['admin']), pacienteController.eliminarPaciente);

module.exports = router;
const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');
const verifyRole = require('../middlewares/roleAuth');

router.get('/', pacienteController.obtenerPacientes);
router.post('/', pacienteController.crearPaciente);

router.put('/:id', verifyRole(['admin']), pacienteController.actualizarPaciente);
router.delete('/:id', verifyRole(['admin']), pacienteController.eliminarPaciente);

module.exports = router;
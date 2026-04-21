const express = require('express');
const router = express.Router();
const odontologoController = require('../controllers/odontologoController');

router.get('/', odontologoController.getOdontologos);
router.post('/', odontologoController.createOdontologo);
router.put('/:id', odontologoController.updateOdontologo);
router.delete('/:id', odontologoController.deleteOdontologo);

module.exports = router;
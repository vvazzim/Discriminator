const express = require('express');
const router = express.Router();
const cabinetController = require('../Controlers/CabinetMedical.Controler');

router.get('/', cabinetController.getAllCabinets);
router.post('/', cabinetController.createCabinet);
router.get('/:id', cabinetController.getCabinetById);
router.put('/:id', cabinetController.updateCabinet);
router.delete('/:id', cabinetController.deleteCabinet);

module.exports = router;

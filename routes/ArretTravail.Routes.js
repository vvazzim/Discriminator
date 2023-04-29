const express = require('express');
const router = express.Router();

const arretTravailController = require('../Controlers/ArretTravail.Controler');

router.post('/', arretTravailController.createArretTravail);
router.get('/', arretTravailController.getAllArretTravails);
router.get('/:id', arretTravailController.getArretTravailById);
router.put('/:id', arretTravailController.updateArretTravail);
router.delete('/:id', arretTravailController.deleteArretTravail);

module.exports = router;

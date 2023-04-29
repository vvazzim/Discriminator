const express = require('express');
const router = express.Router();
const prescriptionCtrl = require('../Controlers/Prescription.Contoler');

router.get('/', prescriptionCtrl.getListePrescriptions);
router.get('/:id', prescriptionCtrl.getPrescriptionById);
router.post('/', prescriptionCtrl.ajouterPrescription);
router.put('/:id', prescriptionCtrl.modifierPrescription);
router.delete('/:id', prescriptionCtrl.supprimerPrescription);

module.exports = router;

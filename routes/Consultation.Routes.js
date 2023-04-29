const express = require('express');
const router = express.Router();
const consultationController = require('../Controlers/Consultation.Controler');
const auth = require('../middleware/auth');

router.get('/', auth(['medecin', 'secretaire']), consultationController.getConsultations);
router.get('/:id', auth(['medecin', 'secretaire']), consultationController.getConsultationById);
router.post('/', auth(['medecin']), consultationController.createConsultation);
router.put('/:id', auth(['medecin']), consultationController.updateConsultation);
router.delete('/:id', auth(['medecin']), consultationController.deleteConsultation);

module.exports = router;

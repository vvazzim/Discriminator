const express = require('express');
const router = express.Router();
const consultationController = require('../Controlers/Consultation.Controler');
const { hasAuthorization } = require('../middleware/auth');

router.get('/', hasAuthorization(['medecin', 'secretaire']), consultationController.getConsultations);
router.get('/:id', hasAuthorization(['medecin', 'secretaire']), consultationController.getConsultationById);
router.post('/', hasAuthorization(['medecin']), consultationController.createConsultation);
router.put('/:id', hasAuthorization(['medecin']), consultationController.updateConsultation);
router.delete('/:id', hasAuthorization(['medecin']), consultationController.deleteConsultation);

module.exports = router;

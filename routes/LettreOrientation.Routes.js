const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const lettreOrientationController = require('../Controlers/LettreOrientation.Controler');

router.get('/', auth(['medecin', 'secretaire']), lettreOrientationController.getListeLettresOrientation);
router.get('/:id', auth(['medecin', 'secretaire']), lettreOrientationController.getLettreOrientationById);
router.post('/', auth('medecin'), lettreOrientationController.ajouterLettreOrientation);
router.put('/:id', auth('medecin'), lettreOrientationController.modifierLettreOrientation);
router.delete('/:id', auth('medecin'), lettreOrientationController.supprimerLettreOrientation);

module.exports = router;

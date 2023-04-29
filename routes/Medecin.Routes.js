const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const medecinController = require('../Controlers/Medecin.Controler');

router.get('/', auth(['administrateur', 'secretaire']), medecinController.getListeMedecins);
router.get('/:id', auth(['administrateur', 'secretaire']), medecinController.getMedecinById);
router.post('/', auth('administrateur'), medecinController.ajouterMedecin);
router.put('/:id', auth('administrateur'), medecinController.modifierMedecin);
router.delete('/:id', auth('administrateur'), medecinController.supprimerMedecin);

module.exports = router;

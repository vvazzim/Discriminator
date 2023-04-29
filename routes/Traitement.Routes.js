const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const traitementController = require('../Controlers/Traitement.Controler');

router.get('/', auth(['medecin', 'secretaire']), traitementController.getListeTraitements);
router.get('/:id', auth(['medecin', 'secretaire']), traitementController.getTraitementById);
router.post('/', auth('medecin'), traitementController.ajouterTraitement);
router.put('/:id', auth('medecin'), traitementController.modifierTraitement);
router.delete('/:id', auth('medecin'), traitementController.supprimerTraitement);

module.exports = router;

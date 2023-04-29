const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const rdvController = require('../Controlers/RDV.Controler');

router.get('/', auth(['medecin', 'secretaire']), rdvController.getListeRDV);
router.get('/:id', auth(['medecin', 'secretaire']), rdvController.getRDVById);
router.post('/', auth(['medecin', 'secretaire']), rdvController.ajouterRDV);
router.put('/:id', auth(['medecin', 'secretaire']), rdvController.modifierRDV);
router.delete('/:id', auth(['medecin', 'secretaire']), rdvController.supprimerRDV);

module.exports = router;

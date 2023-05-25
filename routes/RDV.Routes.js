const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const rdvController = require('../Controlers/RDV.Controler');

router.get('/', rdvController.getListeRDV);
router.get('/:id', rdvController.getRDVById);
router.post('/', rdvController.ajouterRDV);
router.put('/:id', rdvController.modifierRDV);
router.delete('/:id', rdvController.supprimerRDV);

module.exports = router;

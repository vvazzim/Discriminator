const express = require('express');
const router = express.Router();
const factureCtrl = require('../Controlers/Facture.Controler');
const { authenticate } = require('../middlewares/auth');
const { authorize } = require('../middlewares/roles');

router.get('/', authenticate, authorize('medecin', 'secretaire'), factureCtrl.getListeFactures);
router.get('/:id', authenticate, authorize('medecin', 'secretaire'), factureCtrl.getFactureById);
router.post('/', authenticate, authorize('medecin'), factureCtrl.ajouterFacture);
router.put('/:id', authenticate, authorize('medecin'), factureCtrl.modifierFacture);
router.delete('/:id', authenticate, authorize('medecin'), factureCtrl.supprimerFacture);

module.exports = router;


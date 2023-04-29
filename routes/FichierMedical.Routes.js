const express = require('express');
const router = express.Router();
const fichierMedicalCtrl = require('../Controlers/FichierMedical.Controler');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', authenticate, authorize('medecin', 'secretaire'), fichierMedicalCtrl.getListeFichiersMedical);
router.get('/:id', authenticate, authorize('medecin', 'secretaire'), fichierMedicalCtrl.getFichierMedicalById);
router.post('/', authenticate, authorize('medecin'), fichierMedicalCtrl.ajouterFichierMedical);
router.put('/:id', authenticate, authorize('medecin'), fichierMedicalCtrl.modifierFichierMedical);
router.delete('/:id', authenticate, authorize('medecin'), fichierMedicalCtrl.supprimerFichierMedical);

module.exports = router;

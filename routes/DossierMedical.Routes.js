const express = require('express');
const router = express.Router();
const dossierMedicalController = require('../Controlers/DossierMedical.Controler');
const auth = require('../middleware/auth');

router.get('/', dossierMedicalController.getListeDossiersMedical);
router.get('/:id' , dossierMedicalController.getDossierMedicalById);
router.post('/', dossierMedicalController.ajouterDossierMedical);
router.put('/:id', dossierMedicalController.modifierDossierMedical);
router.delete('/:id', dossierMedicalController.supprimerDossierMedical);

module.exports = router;

    const express = require('express');
    const router = express.Router();
    const fichierMedicalCtrl = require('../Controlers/FichierMedical.Controler');
    const { authenticate, authorize } = require('../middleware/auth');

    router.get('/', fichierMedicalCtrl.getAllFichierMedicalFromDossier);
    router.get('/:id', fichierMedicalCtrl.getFichierMedical);
    router.post('/', fichierMedicalCtrl.createFichierMedical);
    router.put('/:id', fichierMedicalCtrl.updateFichierMedical);
    router.delete('/:id', fichierMedicalCtrl.deleteFichierMedical);

    module.exports = router;

const express = require('express');
const router = express.Router();
const certificatController = require('../Controlers/Certificat.Controler');
const auth = require('../middleware/auth');

// Remplacez "ROLE_XXX" par les rôles appropriés pour chacune des routes
router.get('/', auth(['medecin', 'secretaire']), certificatController.getCertificats);
router.get('/:id', auth(['medecin', 'secretaire']), certificatController.getCertificatById);
router.post('/', auth(['medecin']), certificatController.createCertificat);
router.put('/:id', auth(['medecin']), certificatController.updateCertificat);
router.delete('/:id', auth(['medecin']), certificatController.deleteCertificat);

module.exports = router;

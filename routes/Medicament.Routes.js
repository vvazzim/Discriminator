const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const medicamentController = require('../Controlers/Medicament.Controler');

router.get('/', auth(['medecin', 'secretaire']), medicamentController.getListeMedicaments);
router.get('/:id', auth(['medecin', 'secretaire']), medicamentController.getMedicamentById);
router.post('/', auth('medecin'), medicamentController.ajouterMedicament);
router.put('/:id', auth('medecin'), medicamentController.modifierMedicament);
router.delete('/:id', auth('medecin'), medicamentController.supprimerMedicament);

module.exports = router;

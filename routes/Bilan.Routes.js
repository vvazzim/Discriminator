
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const bilanCtrl = require('../Controlers/Bilan.Controler');

// Liste de tous les bilans (accessible par l'administrateur, le médecin et la secrétaire)
router.get('/', authenticate(['Administrateur', 'Médecin', 'Secrétaire']), bilanCtrl.getBilans);

// Obtenir un bilan spécifique par ID (accessible par l'administrateur, le médecin et la secrétaire)
router.get('/:id', authenticate(['Administrateur', 'Médecin', 'Secrétaire']), bilanCtrl.getBilanById);

// Créer un nouveau bilan (accessible par le médecin)
router.post('/', authenticate(['Médecin']), bilanCtrl.createBilan);

// Modifier un bilan existant par ID (accessible par le médecin)
router.put('/:id', authenticate(['Médecin']), bilanCtrl.updateBilan);

// Supprimer un bilan existant par ID (accessible par le médecin)
router.delete('/:id', authenticate(['Médecin']), bilanCtrl.deleteBilan);

module.exports = router;

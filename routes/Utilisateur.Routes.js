const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const utilisateurController = require('../Controlers/Utilisateur.Controler');

router.get('/', auth('administrateur'), utilisateurController.getListeUtilisateurs);
router.get('/:id', auth('administrateur'), utilisateurController.getUtilisateurById);
router.post('/', auth('administrateur'), utilisateurController.ajouterUtilisateur);
router.put('/:id', auth('administrateur'), utilisateurController.modifierUtilisateur);
router.delete('/:id', auth('administrateur'), utilisateurController.supprimerUtilisateur);

module.exports = router;

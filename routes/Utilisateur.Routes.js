const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const utilisateurController = require('../Controlers/Utilisateur.Controler');

router.get('/', auth.authenticate, utilisateurController.getListeUtilisateurs);
router.get('/:id', auth.authenticate, utilisateurController.getUtilisateurById);
router.post('/', auth.authenticate, utilisateurController.ajouterUtilisateur);
router.put('/:id', auth.authenticate, utilisateurController.modifierUtilisateur);
router.delete('/:id', auth.authenticate, utilisateurController.supprimerUtilisateur);

module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const utilisateurController = require('../Controlers/Utilisateur.Controler');

router.get('/' , utilisateurController.getListeUtilisateurs);
router.get('/:id', utilisateurController.getUtilisateurById);
router.post('/', utilisateurController.ajouterUtilisateur);
router.put('/:id', utilisateurController.modifierUtilisateur);
router.delete('/:id', utilisateurController.supprimerUtilisateur);

module.exports = router;

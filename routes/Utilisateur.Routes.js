const express = require('express');
const router = express.Router();
const { authenticate, hasAuthorization } = require('../middleware/auth');
const utilisateurController = require('../Controlers/Utilisateur.Controler');

router.get('/', utilisateurController.getListeUtilisateurs);
router.get('/:id', authenticate, hasAuthorization(['Medecin', 'Assistant']), utilisateurController.getUtilisateurById);
router.post('/', utilisateurController.ajouterUtilisateur);
router.put('/:id', authenticate, hasAuthorization(['Medecin', 'Assistant']), utilisateurController.modifierUtilisateur);
router.delete('/:id', authenticate, hasAuthorization(['Medecin', 'Assistant']), utilisateurController.supprimerUtilisateur);

module.exports = router;

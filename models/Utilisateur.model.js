const mongoose = require('mongoose');

// Définition du schéma pour la collection "utilisateurs"
const utilisateurSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true },
    mot_de_passe: { type: String, required: true }
});

// Création de la collection "utilisateurs"
const UtilisateurModel = mongoose.model('utilisateur', utilisateurSchema);



module.exports = UtilisateurModel;

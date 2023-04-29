const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const utilisateurSchema = new Schema({

    email: { type: String, required: true },

    motDePasse: { type: String, required: true },

    nom: { type: String, required: true },

    prenom: { type: String, required: true },

    telephone: { type: String, required: true },

    adresse: { type: String, required: true },

    typeUtilisateur: {
        type: String,
        required: true,
        enum: ['medecin', 'assistant', 'patient', 'administrateur'],
    },
    token: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Utilisateur', utilisateurSchema);

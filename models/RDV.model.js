const mongoose = require('mongoose');

// Création du schéma de Rendez-vous
const RendezVousSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    heure: {
        type: String,
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    medecin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medecin'
    }
});

// Création du modèle pour la collection Rendez-vous
const RendezVous = mongoose.model('rdv', RendezVousSchema);




module.exports = RendezVous;

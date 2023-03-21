const mongoose = require('mongoose');

const medecinSchema = new mongoose.Schema({
    id_Medecin: {
        type: Number,
        required: true,
        unique: true
    },
    specialite: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    }
});

const MedecinModel = mongoose.model('medecin', medecinSchema);



module.exports = MedecinModel;
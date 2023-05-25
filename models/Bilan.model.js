const mongoose = require('mongoose');
const { Schema } = mongoose;
const FichierMedical = require('./fichierMedical.model');

const bilanSchema = new Schema({
    poids: {
        type: Number,
        required: true,
    },
    taille: {
        type: Number,
        required: true,
    },
    tension: {
        systolique: {
            type: Number,
            required: true,
        },
        diastolique: {
            type: Number,
            required: true,
        },
    },
    temperature: {
        type: Number,
        required: true,
    },
    cholesterol: {
        type: Number,
        required: true,
    },
    glycemie: {
        type: Number,
        required: true,
    },
});

const Bilan = FichierMedical.discriminator('Bilan', bilanSchema);
module.exports = Bilan;

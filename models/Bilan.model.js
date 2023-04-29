const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FichierMedical = require('./FichierMedical.model');

const bilanSchema = new Schema( {
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

bilanSchema.add(FichierMedical.schema);

module.exports = mongoose.model('Bilan', bilanSchema);

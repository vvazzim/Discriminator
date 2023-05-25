const mongoose = require('mongoose');
const { Schema } = mongoose;
const FichierMedical = require('./fichierMedical.model');

const lettreOrientationSchema = new Schema({
    medecin: {
        type: Schema.Types.ObjectId,
        ref: 'Medecin',
        required: true,
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    contenue: String,
    date: Date,
    dateCreation: Date,
    etablissement: String,
    raison: String,
});

const LettreOrientation = FichierMedical.discriminator('LettreOrientation', lettreOrientationSchema);
module.exports = LettreOrientation;

const mongoose = require('mongoose');
const { Schema } = mongoose;
const FichierMedical = require('./fichierMedical.model');

const arretTravailSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    dateDebut: {
        type: Date,
        required: true,
    },
    dateFin: {
        type: Date,
        required: true,
    },
    raison: {
        type: String,
        required: true,
    },
    commentaire: {
        type: String,
    },
});

const ArretTravail = FichierMedical.discriminator('ArretTravail', arretTravailSchema);
module.exports = ArretTravail;

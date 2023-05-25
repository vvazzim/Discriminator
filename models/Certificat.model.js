const mongoose = require('mongoose');
const { Schema } = mongoose;
const FichierMedical = require('./fichierMedical.model');

const certificatSchema = new Schema({
    medecin: {
        type: Schema.Types.ObjectId,
        ref: 'Medecin',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    etatSante: String,
    restrictions: String,
    recommandations: String,
});

const Certificat = FichierMedical.discriminator('Certificat', certificatSchema);
module.exports = Certificat;

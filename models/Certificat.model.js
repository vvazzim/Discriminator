const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FichierMedical = require('./FichierMedical.model');

const certificatMedicalSchema = new Schema( {
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

certificatMedicalSchema.add(FichierMedical.schema);

module.exports = mongoose.model('CertificatMedical', certificatMedicalSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fichierMedicalSchema = new Schema({
    DossierMedical: {
        type: Schema.Types.ObjectId,
        ref: 'DossierMedical',
        required: true
    },
    medecin: {
        type: Schema.Types.ObjectId,
        ref: 'Medecin',
        required: false
    },
    auteur: {
        type: String,
        enum: ['Medecin', 'Patient'],
        required: true
    },
    type: {
        type: String,
        enum: ['Prescription', 'Bilan', 'Arret de travail', 'Certificat Medical', 'Lettre dorientation'],
        required: true
    },
    contenu: {
        type: String,
        required: true
    },
    dateCreation: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('FichierMedical', fichierMedicalSchema);

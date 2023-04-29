
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FichierMedical = require('./FichierMedical.model');

const arretTravailSchema = new Schema({
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



arretTravailSchema.add(FichierMedical.schema);

module.exports = mongoose.model('ArretTravail', arretTravailSchema);

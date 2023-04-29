const mongoose = require('mongoose');
const Utilisateur = require('./Utilisateur.model');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    utilisateur: {
        type: Schema.Types.ObjectId,
        ref: 'Utilisateur',
    },dossierMedical: {
        type: Schema.Types.ObjectId,
        ref: 'DossierMedical'
    }
});

patientSchema.add(Utilisateur.schema);

module.exports = mongoose.model('Patient', patientSchema);

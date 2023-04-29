const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { extendSchema } = require('mongoose-schema-extend');
const FichierMedical = require('./FichierMedical.model');

const lettreOrientationSchema = new Schema( {
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

lettreOrientationSchema.add(FichierMedical.schema);

module.exports = mongoose.model('LettreOrientation', lettreOrientationSchema);


const FichierMedical = require('./FichierMedical.model');
const Traitement = require('./Traitement.model');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
    // Your schema definition goes here
    consultation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consultation',
        required: true,
    },
    traitements: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Traitement',
    }],

});

prescriptionSchema.add(FichierMedical.schema);

module.exports = mongoose.model('Prescription', prescriptionSchema);





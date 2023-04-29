const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dossierMedicalSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
    },
    fichiersMedicaux: [
        {
            type: Schema.Types.ObjectId,
            ref: 'FichierMedical',
        },
    ],

});

module.exports = mongoose.model('DossierMedical', dossierMedicalSchema);

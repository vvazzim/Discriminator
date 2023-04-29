const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cabinetMedicalSchema = new Schema({
    nom: {
        type: String,
        required: true,
    },
    adresse: {
        rue: String,
        ville: String,
        codePostal: String,
        pays: String,
    },
    numeroTelephone: String,
    medecins: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Medecin',
        },
    ],
});

module.exports = mongoose.model('CabinetMedical', cabinetMedicalSchema);

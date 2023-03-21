

const mongoose = require('mongoose');

const { Schema, ObjectId} = mongoose;

const CabinetMedicalSchema = new Schema({


    nom: {
        type: String,
        required: true,
    },
    adresse: {
        type: String,
        required: true,
    },
    medecins: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Medecin',
        },
    ],
    assistants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Assistant',
        },
    ],
    dossiers_medicaux: [
        {
            type: Schema.Types.ObjectId,
            ref: 'DossierMedical',
        },
    ],
});

const CabinetMedicalModel = mongoose.model('cabinetMedical', CabinetMedicalSchema);



module.exports = CabinetMedicalModel;

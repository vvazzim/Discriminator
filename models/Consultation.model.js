const mongoose = require('mongoose');
const { Schema, model, ObjectId } = require('mongoose');


const consultationSchema = new mongoose.Schema({
    id_consultation: new ObjectId,
    date_consultation: {
        type: Date,
        required: true
    },
    heure_debut: {
        type: Date,
        required: true
    },
    heure_fin: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    medecin: {
        type: Schema.Types.ObjectId,
        ref: 'Medecin',
        required: true
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    }
});

const ConsultationModel = mongoose.model('consultation', consultationSchema);



module.exports =  ConsultationModel;

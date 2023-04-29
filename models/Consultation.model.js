const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consultationSchema = new Schema({
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
    date: {
        type: Date,
        required: true,
    },
    diagnostic: String,
    prescriptions: [{
        type: Schema.Types.ObjectId,
        ref: 'Prescription',
    }],
});

module.exports = mongoose.model('Consultation', consultationSchema);

const mongoose = require('mongoose');

const dossierMedicalSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    prescriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' }],
    consultations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Consultation' }]
});

const DossierMedicalModel = mongoose.model('dossierMedical', dossierMedicalSchema);




module.exports = DossierMedicalModel;

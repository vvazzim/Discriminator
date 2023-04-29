const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rendezvousSchema = new Schema({
    medecin: {
        type: Schema.Types.ObjectId,
        ref: 'Medecin',
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
    },
    date: Date,
    heureDebut: String,
    heureFin: String,
    statut: String,
});

module.exports = mongoose.model('Rendezvous', rendezvousSchema);

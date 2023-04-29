const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paiementSchema = new Schema({
    montant: Number,
    date: Date,
});

const factureSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
    },
    consultation: {
        type: Schema.Types.ObjectId,
        ref: 'Consultation',
    },
    date: Date,
    description: String,
    total: Number,
    paiements: [paiementSchema],
    statut: {
        type: String,
        enum: ['payée', 'impayée', 'en attente'],
        required: true,
    },
});

module.exports = mongoose.model('Facture', factureSchema);

const mongoose = require('mongoose');

const factureSchema = new mongoose.Schema({
    id_facture: { type: Number, required: true },
    date_facture: { type: Date, default: Date.now },
    montant: { type: Number, required: true },
    consultation: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultation' }
});

module.exports = mongoose.model('factures', factureSchema);
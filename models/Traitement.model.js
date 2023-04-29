const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const traitementSchema = new Schema({
    medicament: {
        type: Schema.Types.ObjectId,
        ref: 'Medicament',
    },
    posologie: String,
    duree: Number,
    dateDebut: Date,
});

module.exports = mongoose.model('Traitement', traitementSchema);

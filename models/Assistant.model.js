const mongoose = require('mongoose');
const Utilisateur = require('./Utilisateur.model');
const Schema = mongoose.Schema;

const assistantSchema = new Schema({
    cabinetMedical: {
        type: Schema.Types.ObjectId,
        ref: 'CabinetMedical',
        required: true,
    },
    utilisateur: {
        type: Schema.Types.ObjectId,
        ref: 'Utilisateur',
    },
});

assistantSchema.add(Utilisateur.schema);

module.exports = mongoose.model('Assistant', assistantSchema);

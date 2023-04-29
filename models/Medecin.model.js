const mongoose = require('mongoose');
const Utilisateur = require('./Utilisateur.model');
const Schema = mongoose.Schema;

const medecinSchema = new Schema({
    utilisateur: {
        type: Schema.Types.ObjectId,
        ref: 'Utilisateur',
    },
    specialite: String,
    cabinets: [
        {
            type: Schema.Types.ObjectId,
            ref: 'CabinetMedical',
        },
    ],
});

medecinSchema.add(Utilisateur.schema);

module.exports = mongoose.model('Medecin', medecinSchema);

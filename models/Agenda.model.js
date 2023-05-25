const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agendaSchema = new Schema({
    utilisateur: {
        type: Schema.Types.ObjectId,
        ref: 'Utilisateur',
        required: true,
        enum: {
            values: ['Medecin', 'Patient'],
        },
    },
    date: {
        type: Date,
        required: true,
    },
    disponibilites: [
        {
            jour: {
                type: String,
                enum: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
                required: true
            },
            heureDebut: {
                type: Date,
                required: true,
            },
            heureFin: {
                type: Date,
                required: true,
            },
        },
    ],
});

const Agenda = mongoose.model('Agenda', agendaSchema);
module.exports = Agenda;

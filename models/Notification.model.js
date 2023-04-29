const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({

    utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },

    type: { type: String, enum: ['Rendez-vous', 'Facture', 'Autre'], required: true },

    message: { type: String, required: true },

    dateEnvoi: { type: Date, required: true },

    lu: { type: Boolean, default: false },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;

const mongoose = require('mongoose');
const traitement = require('./Traitement.model');

// Définition du schéma PrescriptionModel
const prescriptionSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    date_prescription: { type: Date, required: true },
    traitement: { type: mongoose.Schema.Types.ObjectId, ref: 'Traitement' },
});

// Création du modèle PrescriptionModel à partir du schéma
const PrescriptionModel = mongoose.model('prescription', prescriptionSchema);





// Export du modèle PrescriptionModel pour pouvoir l'utiliser dans d'autres fichiers
module.exports = PrescriptionModel;

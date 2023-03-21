const mongoose = require('mongoose');

// Définition du schéma PatientModel
const patientSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    date_naissance: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    tel: { type: String, required: true },
    adresse: { type: String, required: true },
});

// Création du modèle PatientModel à partir du schéma
const PatientModel = mongoose.model('patient', patientSchema);





// Export du modèle PatientModel pour pouvoir l'utiliser dans d'autres fichiers
module.exports = PatientModel;

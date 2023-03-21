const mongoose = require('mongoose');

// Définition du schéma TraitementModel
const traitementSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    medicament: { type: String, required: true },
    posologie: { type: String, required: true },
});

// Création du modèle TraitementModel à partir du schéma
const TraitementModel = mongoose.model('traitement', traitementSchema);

// Export du modèle TraitementModel pour pouvoir l'utiliser dans d'autres fichiers
module.exports = TraitementModel;

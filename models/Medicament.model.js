const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicamentSchema = new Schema({
    nom: String,
    description: String,
    posologieStandard: String,
});

module.exports = mongoose.model('Medicament', medicamentSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const archivageSchema = new Schema({
    document: {
        type: Schema.Types.ObjectId,
        refPath: 'documentType',
        required: true,
    },
    documentType: {
        type: String,
        enum: ['Patient', 'Medecin', 'Assistant', 'Consultation', 'Prescription', 'FichierMedical', 'Rendezvous', 'Facture', 'Agenda', 'CabinetMedical', 'Notification'],
        required: true,
    },
    dateArchivage: {
        type: Date,
        default: Date.now,
    },
    archivePar: {
        type: Schema.Types.ObjectId,
        ref: 'Utilisateur',
        required: true,
    },
    raison:{
        type:String,
        required: true
    } ,
});

module.exports = mongoose.model('Archivage', archivageSchema);


//Je comprends votre préoccupation. Le premier attribut,
// document, est conçu pour être une référence polymorphe au document archivé,
// quelle que soit sa collection d'origine.
// La propriété refPath permet d'utiliser le champ documentType pour déterminer la collection d'origine du document archivé.
// Cependant, si vous trouvez cette approche trop complexe,
// il existe une alternative en utilisant la propriété ref pour chaque type de document dans des attributs séparés.



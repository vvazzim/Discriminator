const mongoose = require('mongoose');
const { Schema } = mongoose;
const auditLogger = require('../middleware/audit');

const utilisateurSchema = new Schema({
    email: { type: String, required: true },
    motDePasse: { type: String, required: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    telephone: { type: String, required: true },
    adresse: { type: String, required: true },
    typeUtilisateur: { type: String, required: true, enum: ['Patient', 'Medecin', 'Assistant'] },
    archived: { type: Boolean, default: false },
});

const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);

const patientSchema = new Schema({
    dateNaissance: Date,
    sexe: String,
    NSS: { type: String, unique: true, sparse: true },
    dossiersMedicaux: [
        {
            type: Schema.Types.ObjectId,
            ref: 'DossierMedical',
        },
    ],
});

const Patient = Utilisateur.discriminator('Patient', patientSchema);

const medecinSchema = new Schema({
    specialite: String,
    cabinets: [{
        type: Schema.Types.ObjectId,
        ref: 'CabinetMedical'
    }]
});

const Medecin = Utilisateur.discriminator('Medecin', medecinSchema);

const assistantSchema = new Schema({
    medecin: { type: Schema.Types.ObjectId, ref: 'Medecin' },
    cabinetMedical: { type: Schema.Types.ObjectId, ref: 'CabinetMedical' }
});

const Assistant = Utilisateur.discriminator('Assistant', assistantSchema);

const addAuditHooks = schema => {
    schema.post('save', function() {
        auditLogger(this, 'CREATE');
    });
    schema.pre('updateOne', function(next) {
        this._update.$push = this._update.$push || {};
        this._update.$push.audit = {action: 'UPDATE', date: new Date()};
        next();
    });
    schema.pre('deleteOne', function(next) {
        this._update.$push = this._update.$push || {};
        this._update.$push.audit = {action: 'DELETE', date: new Date()};
        next();
    });
};


const archiveMiddleware = require('../middleware/archive');

// ...

archiveMiddleware(utilisateurSchema);
archiveMiddleware(patientSchema);
archiveMiddleware(medecinSchema);
archiveMiddleware(assistantSchema);




addAuditHooks(utilisateurSchema);
addAuditHooks(patientSchema);
addAuditHooks(medecinSchema);
addAuditHooks(assistantSchema);

module.exports = {
    Utilisateur,
    Patient,
    Medecin,
    Assistant
};

const mongoose = require('mongoose');
const { Schema } = mongoose;

const fichierMedicalSchema = new Schema({
    DossierMedical: {
        type: Schema.Types.ObjectId,
        ref: 'DossierMedical',
        required: true
    },
    medecin: {
        type: Schema.Types.ObjectId,
        ref: 'Medecin',
        required: false
    },
    auteur: {
        type: String,
        enum: ['Medecin', 'Patient'],
        required: true
    },
    type: {
        type: String,
        enum: ['Prescription', 'Bilan', 'Arret de travail', 'Certificat Medical', 'Lettre dorientation' , 'Autre'],
        required: true
    },
    contenu: {
        type: String,
        required: false
    },
    dateCreation: {
        type: Date,
        default: Date.now
    },
});

const FichierMedical = mongoose.model('FichierMedical', fichierMedicalSchema);

const lettreOrientationSchema = new Schema({
    medecin: {
        type: Schema.Types.ObjectId,
        ref: 'Medecin',
        required: true,
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    etablissement: String,
    raison: String,
});
const LettreOrientation = FichierMedical.discriminator('LettreOrientation', lettreOrientationSchema);

const prescriptionSchema = new Schema({
    consultation: {
        type: Schema.Types.ObjectId,
        ref: 'Consultation',
        required: true,
    },
    traitements: [{
        type: Schema.Types.ObjectId,
        ref: 'Traitement',
    }],
});
const Prescription = FichierMedical.discriminator('Prescription', prescriptionSchema);

const bilanSchema = new Schema({
    poids: {
        type: Number,
        required: true,
    },
    taille: {
        type: Number,
        required: true,
    },
    tension: {
        systolique: {
            type: Number,
            required: true,
        },
        diastolique: {
            type: Number,
            required: true,
        },
    },
    temperature: {
        type: Number,
        required: true,
    },
    cholesterol: {
        type: Number,
        required: true,
    },
    glycemie: {
        type: Number,
        required: true,
    },
    testsSupplementaires: [{
        nomTest: String,
        valeurTest: String,
    }],
});
const Bilan = FichierMedical.discriminator('Bilan', bilanSchema);

const arretTravailSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    dateDebut: {
        type: Date,
        required: true,
    },
    dateFin: {
        type: Date,
        required: true,
    },
    raison: {
        type: String,
        required: true,
    },
    commentaire: {
        type: String,
    },
});
const ArretTravail = FichierMedical.discriminator('ArretTravail', arretTravailSchema);

const certificatSchema = new Schema({
    medecin: {
        type: Schema.Types.ObjectId,
        ref: 'Medecin',
        required: true,
    },
    etatSante: String,
    restrictions: String,
    recommandations: String,
});
const Certificat = FichierMedical.discriminator('Certificat', certificatSchema);

const pdfFichier = new Schema({
    titre: {
        type: String,
        required: true,
    },
    urlPdf: {
        type: String,
        required: true,
    },
});

const PdfFichierSchema = FichierMedical.discriminator('PdfFichier', pdfFichier);


module.exports = { FichierMedical, LettreOrientation, Prescription, Bilan, ArretTravail, Certificat , PdfFichierSchema};


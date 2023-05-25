const {
    FichierMedical,
    LettreOrientation,
    Prescription,
    Bilan,
    ArretTravail,
    Certificat,
    PdfFichierSchema
} = require('../models/FichierMedical.model');

const typeAllowed = ['Lettre dorientation', 'Prescription', 'Bilan', 'Arret de travail', 'Certificat Medical', 'Autre'];

exports.createFichierMedical = async function(req, res) {
    const { type } = req.body;

    if (!typeAllowed.includes(type)) {
        return res.status(400).json({ error: 'Type de fichier non autorisé' });
    }

    let fichier;

    switch (type) {
        case 'Lettre dorientation':
            fichier = new LettreOrientation(req.body);
            break;
        case 'Prescription':
            fichier = new Prescription(req.body);
            break;
        case 'Bilan':
            fichier = new Bilan(req.body);
            break;
        case 'Arret de travail':
            fichier = new ArretTravail(req.body);
            break;
        case 'Certificat Medical':
            fichier = new Certificat(req.body);
            break;
        case 'Autre':
            fichier = new PdfFichierSchema(req.body);
            break;
    }

    await fichier.save();
    res.json(fichier);
};

exports.getAllFichierMedicalFromDossier = async function(req, res) {
    const { dossierId } = req.params;

    const fichiers = await FichierMedical.find({ DossierMedical: dossierId }).exec();

    if (!fichiers) {
        return res.status(404).json({ message: "Aucun fichier médical trouvé pour ce DossierMedical" });
    }

    res.json(fichiers);
};


exports.getFichierMedical = async function(req, res) {
    const fichier = await FichierMedical.findById(req.params.id).exec();
    res.json(fichier);
};

exports.updateFichierMedical = async function(req, res) {
    const updatedFichier = await FichierMedical.findByIdAndUpdate(req.params.id, req.body, {new: true}).exec();
    if(!updatedFichier){
        return res.status(404).json({message: "Fichier médical non trouvé avec l'id "+req.params.id});
    }
    res.json(updatedFichier);
};

exports.deleteFichierMedical = async function(req, res) {
    const fichier = await FichierMedical.findByIdAndRemove(req.params.id).exec();
    if(!fichier){
        return res.status(404).json({message: "Fichier médical non trouvé avec l'id "+req.params.id});
    }
    res.json({message: "Fichier médical supprimé avec succès"});
};

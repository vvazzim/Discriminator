const DossierMedical = require('../models/DossierMedical.model');

exports.getListeDossiersMedical = async (req, res) => {
    try {
        const dossiers = await DossierMedical.find().populate('patient');
        res.json(dossiers);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.getDossierMedicalById = async (req, res) => {
    try {
        const dossier = await DossierMedical.findById(req.params.id).populate('patient');
        if (!dossier) {
            return res.status(404).json({ message: 'Dossier médical introuvable' });
        }
        res.json(dossier);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.ajouterDossierMedical = async (req, res) => {
    const { patient, antecedents, allergies, traitementsEnCours } = req.body;
    try {
        const nouveauDossier = new DossierMedical({ patient, antecedents, allergies, traitementsEnCours });
        await nouveauDossier.save();
        res.json(nouveauDossier);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.modifierDossierMedical = async (req, res) => {
    const { patient, antecedents, allergies, traitementsEnCours } = req.body;
    try {
        const dossier = await DossierMedical.findById(req.params.id);
        if (!dossier) {
            return res.status(404).json({ message: 'Dossier médical introuvable' });
        }
        dossier.patient = patient;
        dossier.antecedents = antecedents;
        dossier.allergies = allergies;
        dossier.traitementsEnCours = traitementsEnCours;
        await dossier.save();
        res.json(dossier);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.supprimerDossierMedical = async (req, res) => {
    try {
        const dossier = await DossierMedical.findById(req.params.id);
        if (!dossier) {
            return res.status(404).json({ message: 'Dossier médical introuvable' });
        }
        await dossier.remove();
        res.json({ message: 'Dossier médical supprimé' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.supprimerDossierMedical = async (req, res) => {
    try {
        const dossier = await DossierMedical.findById(req.params.id);
        if (!dossier) {
            return res.status(404).json({ message: 'Dossier médical introuvable' });
        }
        await dossier.remove();
        res.json({ message: 'Dossier médical supprimé' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};


const FichierMedical = require('../models/FichierMedical.model');
const { authenticate, authorize } = require('../middleware/auth');

exports.getListeFichiersMedicaux = authenticate(authorize('ROLE_MEDECIN', 'ROLE_SECRETAIRE'), async (req, res) => {
    try {
        const listeFichiersMedicaux = await FichierMedical.find().populate('patient', 'nom prenom');
        res.json(listeFichiersMedicaux);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
});

exports.getFichierMedicalById = authenticate(authorize('ROLE_MEDECIN', 'ROLE_SECRETAIRE'), async (req, res) => {
    try {
        const fichierMedical = await FichierMedical.findById(req.params.id).populate('patient', 'nom prenom');
        if (!fichierMedical) {
            return res.status(404).json({ message: 'Fichier médical introuvable' });
        }
        res.json(fichierMedical);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
});

exports.ajouterFichierMedical = authenticate(authorize('ROLE_MEDECIN'), async (req, res) => {
    const { patient, type, dateCreation } = req.body;
    try {
        const nouveauFichierMedical = new FichierMedical({ patient, type, dateCreation });
        await nouveauFichierMedical.save();
        res.json(nouveauFichierMedical);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
});

exports.modifierFichierMedical = authenticate(authorize('ROLE_MEDECIN'), async (req, res) => {
    const { type, dateCreation } = req.body;
    try {
        const fichierMedical = await FichierMedical.findById(req.params.id);
        if (!fichierMedical) {
            return res.status(404).json({ message: 'Fichier médical introuvable' });
        }
        fichierMedical.type = type;
        fichierMedical.dateCreation = dateCreation;
        await fichierMedical.save();
        res.json(fichierMedical);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
});

exports.supprimerFichierMedical = authenticate(authorize('ROLE_MEDECIN'), async (req, res) => {
    try {
        const fichierMedical = await FichierMedical.findById(req.params.id);
        if (!fichierMedical) {
            return res.status(404).json({ message: 'Fichier médical introuvable' });
        }
        await fichierMedical.remove();
        res.json({ message: 'Fichier médical supprimé' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
});

const Traitement = require('../models/Traitement.model');

exports.getListeTraitements = async (req, res) => {
    try {
        const listeTraitements = await Traitement.find().populate('patient', 'nom prenom').populate('medecin', 'nom prenom');
        res.json(listeTraitements);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.getTraitementById = async (req, res) => {
    try {
        const traitement = await Traitement.findById(req.params.id).populate('patient', 'nom prenom').populate('medecin', 'nom prenom');
        if (!traitement) {
            return res.status(404).json({ message: 'Traitement introuvable' });
        }
        res.json(traitement);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.ajouterTraitement = async (req, res) => {
    const { patient, medecin, dateDebut, dateFin, medicaments, remarques } = req.body;
    try {
        const nouveauTraitement = new Traitement({ patient, medecin, dateDebut, dateFin, medicaments, remarques });
        await nouveauTraitement.save();
        res.json(nouveauTraitement);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.modifierTraitement = async (req, res) => {
    const { patient, medecin, dateDebut, dateFin, medicaments, remarques } = req.body;
    try {
        const traitement = await Traitement.findById(req.params.id);
        if (!traitement) {
            return res.status(404).json({ message: 'Traitement introuvable' });
        }
        traitement.patient = patient;
        traitement.medecin = medecin;
        traitement.dateDebut = dateDebut;
        traitement.dateFin = dateFin;
        traitement.medicaments = medicaments;
        traitement.remarques = remarques;
        await traitement.save();
        res.json(traitement);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.supprimerTraitement = async (req, res) => {
    try {
        const traitement = await Traitement.findById(req.params.id);
        if (!traitement) {
            return res.status(404).json({ message: 'Traitement introuvable' });
        }
        await traitement.remove();
        res.json({ message: 'Traitement supprimé avec succès' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

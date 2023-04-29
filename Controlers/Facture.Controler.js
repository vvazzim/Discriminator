const Facture = require('../models/Facture.model');

exports.getListeFactures = async (req, res) => {
    try {
        const listeFactures = await Facture.find().populate('patient medecin');
        res.json(listeFactures);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.getFactureById = async (req, res) => {
    try {
        const facture = await Facture.findById(req.params.id).populate('patient medecin');
        if (!facture) {
            return res.status(404).json({ message: 'Facture introuvable' });
        }
        res.json(facture);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.ajouterFacture = async (req, res) => {
    const { patient, medecin, date, montant, detail } = req.body;
    try {
        const nouvelleFacture = new Facture({ patient, medecin, date, montant, detail });
        await nouvelleFacture.save();
        res.json(nouvelleFacture);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.modifierFacture = async (req, res) => {
    const { patient, medecin, date, montant, detail } = req.body;
    try {
        const facture = await Facture.findById(req.params.id);
        if (!facture) {
            return res.status(404).json({ message: 'Facture introuvable' });
        }
        facture.patient = patient;
        facture.medecin = medecin;
        facture.date = date;
        facture.montant = montant;
        facture.detail = detail;
        await facture.save();
        res.json(facture);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.supprimerFacture = async (req, res) => {
    try {
        const facture = await Facture.findById(req.params.id);
        if (!facture) {
            return res.status(404).json({ message: 'Facture introuvable' });
        }
        await facture.remove();
        res.json({ message: 'Facture supprimée' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

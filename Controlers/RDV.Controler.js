const RDV = require('../models/RDV.model');
const { authenticate, authorize } = require('../middleware/auth');

exports.getListeRDV =  async (req, res) => {
    try {
        const rdvs = await RDV.find().populate('patient', 'nom prenom').populate('medecin', 'nom prenom');
        res.json(rdvs);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.getRDVById = async (req, res) => {
    try {
        const rdv = await RDV.findById(req.params.id).populate('patient', 'nom prenom email').populate('medecin', 'nom prenom');
        if (!rdv) {
            return res.status(404).json({ message: 'RDV introuvable' });
        }
        res.json(rdv);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.ajouterRDV = async (req, res) => {
    const { medecin, patient, date, heureDebut, heureFin, statut } = req.body;
    try {
        const nouveauRDV = new RDV({ medecin, patient, date, heureDebut, heureFin, statut });
        await nouveauRDV.save();
        res.json(nouveauRDV);
    } catch (error) {
        console.error('Erreur lors de l\'ajout du RDV:', error);
        res.status(500).send('Erreur du serveur');
    }
};


exports.modifierRDV =  async (req, res) => {
    const { dateRDV, heureRDV } = req.body;
    try {
        const rdv = await RDV.findById(req.params.id);
        if (!rdv) {
            return res.status(404).json({ message: 'RDV introuvable' });
        }
        rdv.dateRDV = dateRDV;
        rdv.heureRDV = heureRDV;
        await rdv.save();
        res.json(rdv);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.supprimerRDV = async (req, res) => {
    try {
        const rdv = await RDV.findById(req.params.id);
        if (!rdv) {
            return res.status(404).json({ message: 'RDV introuvable' });
        }
        await rdv.deleteOne();
        res.json({ message: 'RDV archivé' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

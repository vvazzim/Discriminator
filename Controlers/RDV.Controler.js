const RDV = require('../models/RDV.model');
const { authenticate, authorize } = require('../middleware/auth');

exports.getListeRDV = authenticate(authorize('ROLE_MEDECIN', 'ROLE_SECRETAIRE'), async (req, res) => {
    try {
        const rdvs = await RDV.find().populate('patient', 'nom prenom');
        res.json(rdvs);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
});

exports.getRDVById = authenticate(authorize('ROLE_MEDECIN', 'ROLE_SECRETAIRE'), async (req, res) => {
    try {
        const rdv = await RDV.findById(req.params.id).populate('patient', 'nom prenom');
        if (!rdv) {
            return res.status(404).json({ message: 'RDV introuvable' });
        }
        res.json(rdv);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
});

exports.ajouterRDV = authenticate(authorize('ROLE_MEDECIN', 'ROLE_SECRETAIRE'), async (req, res) => {
    const { patient, dateRDV, heureRDV } = req.body;
    try {
        const nouveauRDV = new RDV({ patient, dateRDV, heureRDV });
        await nouveauRDV.save();
        res.json(nouveauRDV);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
});

exports.modifierRDV = authenticate(authorize('ROLE_MEDECIN', 'ROLE_SECRETAIRE'), async (req, res) => {
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
});

exports.supprimerRDV = authenticate(authorize('ROLE_MEDECIN', 'ROLE_SECRETAIRE'), async (req, res) => {
    try {
        const rdv = await RDV.findById(req.params.id);
        if (!rdv) {
            return res.status(404).json({ message: 'RDV introuvable' });
        }
        await rdv.remove();
        res.json({ message: 'RDV supprimé' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
});

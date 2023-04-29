const LettreOrientation = require('../models/LettreOrientation.model');
const { authenticate, authorize } = require('../middleware/auth');

exports.getListeLettresOrientation = authenticate(authorize('medecin', 'ROLE_SECRETAIRE'), async (req, res) => {
    try {
        const lettresOrientation = await LettreOrientation.find().populate('patient', 'nom prenom');
        res.json(lettresOrientation);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
});

exports.getLettreOrientationById = authenticate(authorize('medecin', 'ROLE_SECRETAIRE'), async (req, res) => {
    try {
        const lettreOrientation = await LettreOrientation.findById(req.params.id).populate('patient', 'nom prenom');
        if (!lettreOrientation) {
            return res.status(404).json({ message: 'Lettre d\'orientation introuvable' });
        }
        res.json(lettreOrientation);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
});

exports.ajouterLettreOrientation = authenticate(authorize('medecin'), async (req, res) => {
    const { patient, contenu, dateCreation } = req.body;
    try {
        const nouvelleLettreOrientation = new LettreOrientation({ patient, contenu, dateCreation });
        await nouvelleLettreOrientation.save();
        res.json(nouvelleLettreOrientation);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
});

exports.modifierLettreOrientation = authenticate(authorize('medecin'), async (req, res) => {
    const { contenu, dateCreation } = req.body;
    try {
        const lettreOrientation = await LettreOrientation.findById(req.params.id);
        if (!lettreOrientation) {
            return res.status(404).json({ message: 'Lettre d\'orientation introuvable' });
        }
        lettreOrientation.contenu = contenu;
        lettreOrientation.dateCreation = dateCreation;
        await lettreOrientation.save();
        res.json(lettreOrientation);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
});

exports.supprimerLettreOrientation = authenticate(authorize('medecin'), async (req, res) => {
    try {
        const lettreOrientation = await LettreOrientation.findById(req.params.id);
        if (!lettreOrientation) {
            return res.status(404).json({ message: 'Lettre d\'orientation introuvable' });
        }
        await lettreOrientation.remove();
        res.json({ message: 'Lettre d\'orientation supprimée' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
});

const Medicament = require('../models/Medicament.model');
const { authenticate, authorize } = require('../middleware/auth');

exports.getListeMedicaments = authenticate(authorize('ROLE_MEDECIN', 'ROLE_SECRETAIRE'), async (req, res) => {
    try {
        const medicaments = await Medicament.find();
        res.json(medicaments);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
});

exports.getMedicamentById = authenticate(authorize('ROLE_MEDECIN', 'ROLE_SECRETAIRE'), async (req, res) => {
    try {
        const medicament = await Medicament.findById(req.params.id);
        if (!medicament) {
            return res.status(404).json({ message: 'Médicament introuvable' });
        }
        res.json(medicament);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
});

exports.ajouterMedicament = authenticate(authorize('ROLE_MEDECIN'), async (req, res) => {
    const { nom, description } = req.body;
    try {
        const nouveauMedicament = new Medicament({ nom, description });
        await nouveauMedicament.save();
        res.json(nouveauMedicament);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
});

exports.modifierMedicament = authenticate(authorize('ROLE_MEDECIN'), async (req, res) => {
    const { nom, description } = req.body;
    try {
        const medicament = await Medicament.findById(req.params.id);
        if (!medicament) {
            return res.status(404).json({ message: 'Médicament introuvable' });
        }
        medicament.nom = nom;
        medicament.description = description;
        await medicament.save();
        res.json(medicament);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
});

exports.supprimerMedicament = authenticate(authorize('ROLE_MEDECIN'), async (req, res) => {
    try {
        const medicament = await Medicament.findById(req.params.id);
        if (!medicament) {
            return res.status(404).json({ message: 'Médicament introuvable' });
        }
        await medicament.remove();
        res.json({ message: 'Médicament supprimé' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
});

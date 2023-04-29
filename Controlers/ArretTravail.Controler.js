const ArretTravail = require('../models/ArretTravail.model');

// Créer un nouvel arrêt de travail
exports.createArretTravail = async (req, res) => {
    try {
        const newArretTravail = await ArretTravail.create(req.body);
        res.status(201).json(newArretTravail);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer tous les arrêts de travail
exports.getAllArretTravails = async (req, res) => {
    try {
        const arretTravails = await ArretTravail.find().populate('patient');
        res.status(200).json(arretTravails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer un arrêt de travail par son ID
exports.getArretTravailById = async (req, res) => {
    try {
        const arretTravail = await ArretTravail.findById(req.params.id).populate('patient');
        if (!arretTravail) {
            res.status(404).json({ message: 'Arret de travail non trouvé' });
        } else {
            res.status(200).json(arretTravail);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour un arrêt de travail
exports.updateArretTravail = async (req, res) => {
    try {
        const arretTravail = await ArretTravail.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!arretTravail) {
            res.status(404).json({ message: 'Arret de travail non trouvé' });
        } else {
            res.status(200).json(arretTravail);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un arrêt de travail
exports.deleteArretTravail = async (req, res) => {
    try {
        const arretTravail = await ArretTravail.findByIdAndDelete(req.params.id);
        if (!arretTravail) {
            res.status(404).json({ message: 'Arret de travail non trouvé' });
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

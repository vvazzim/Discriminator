const Archive = require('../models/Archive.model');

// Obtenir tous les archives
exports.getArchives = async (req, res) => {
    try {
        const archives = await Archive.find();
        res.status(200).json(archives);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtenir un archive spécifique
exports.getArchiveById = async (req, res) => {
    try {
        const archive = await Archive.findById(req.params.id);
        if (archive) {
            res.status(200).json(archive);
        } else {
            res.status(404).json({ message: 'Archive non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Ajouter un nouveau archive
exports.addArchive = async (req, res) => {
    const archive = new Archive({
        utilisateur: req.body.utilisateur,
        date: req.body.date,
        motif: req.body.motif,
        description: req.body.description,
    });

    try {
        const newArchive = await archive.save();
        res.status(201).json(newArchive);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mettre à jour un archive existant
exports.updateArchive = async (req, res) => {
    try {
        const archive = await Archive.findById(req.params.id);
        if (archive) {
            archive.utilisateur = req.body.utilisateur || archive.utilisateur;
            archive.date = req.body.date || archive.date;
            archive.motif = req.body.motif || archive.motif;
            archive.description = req.body.description || archive.description;

            const updatedArchive = await archive.save();
            res.status(200).json(updatedArchive);
        } else {
            res.status(404).json({ message: 'Archive non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer un archive
exports.deleteArchive = async (req, res) => {
    try {
        const archive = await Archive.findById(req.params.id);
        if (archive) {
            await archive.remove();
            res.status(200).json({ message: 'Archive supprimé' });
        } else {
            res.status(404).json({ message: 'Archive non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

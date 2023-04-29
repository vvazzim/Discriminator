const Bilan = require('../models/Bilan.model');

exports.getBilans = async (req, res) => {
    try {
        const listeBilans = await Bilan.find().populate('patient medecin');
        res.json(listeBilans);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erreur du serveur");
    }
};

exports.getBilanById = async (req, res) => {
    try {
        const bilan = await Bilan.findById(req.params.id).populate('patient medecin');
        if (!bilan) {
            return res.status(404).json({ message: "Bilan introuvable" });
        }
        res.json(bilan);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erreur du serveur");
    }
};

exports.createBilan = async (req, res) => {
    const { patient, medecin, date, resume, prescription } = req.body;
    try {
        const nouveauBilan = new Bilan({ patient, medecin, date, resume, prescription });
        await nouveauBilan.save();
        res.json(nouveauBilan);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erreur du serveur");
    }
};

exports.updateBilan = async (req, res) => {
    const { patient, medecin, date, resume, prescription } = req.body;
    try {
        const bilan = await Bilan.findById(req.params.id);
        if (!bilan) {
            return res.status(404).json({ message: "Bilan introuvable" });
        }
        bilan.patient = patient;
        bilan.medecin = medecin;
        bilan.date = date;
        bilan.resume = resume;
        bilan.prescription = prescription;
        await bilan.save();
        res.json(bilan);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erreur du serveur");
    }
};

exports.deleteBilan = async (req, res) => {
    try {
        const bilan = await Bilan.findById(req.params.id);
        if (!bilan) {
            return res.status(404).json({ message: "Bilan introuvable" });
        }
        await bilan.remove();
        res.json({ message: "Bilan supprimé" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erreur du serveur");
    }
};

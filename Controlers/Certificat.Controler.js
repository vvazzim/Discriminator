const Certificat = require('../models/Certificat.model');

exports.getCertificats = async (req, res) => {
    try {
        const listeCertificats = await Certificat.find().populate('patient medecin');
        res.json(listeCertificats);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erreur du serveur");
    }
};

exports.getCertificatById = async (req, res) => {
    try {
        const certificat = await Certificat.findById(req.params.id).populate('patient medecin');
        if (!certificat) {
            return res.status(404).json({ message: "Certificat introuvable" });
        }
        res.json(certificat);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erreur du serveur");
    }
};

exports.createCertificat = async (req, res) => {
    const { patient, medecin, date, description } = req.body;
    try {
        const nouveauCertificat = new Certificat({ patient, medecin, date, description });
        await nouveauCertificat.save();
        res.json(nouveauCertificat);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erreur du serveur");
    }
};

exports.updateCertificat = async (req, res) => {
    const { patient, medecin, date, description } = req.body;
    try {
        const certificat = await Certificat.findById(req.params.id);
        if (!certificat) {
            return res.status(404).json({ message: "Certificat introuvable" });
        }
        certificat.patient = patient;
        certificat.medecin = medecin;
        certificat.date = date;
        certificat.description = description;
        await certificat.save();
        res.json(certificat);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erreur du serveur");
    }
};

exports.deleteCertificat = async (req, res) => {
    try {
        const certificat = await Certificat.findById(req.params.id);
        if (!certificat) {
            return res.status(404).json({ message: "Certificat introuvable" });
        }
        await certificat.remove();
        res.json({ message: "Certificat supprimé" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erreur du serveur");
    }
};

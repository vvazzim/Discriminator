const Consultation = require('../models/Consultation.model');

exports.getConsultations = async (req, res) => {
    try {
        const consultations = await Consultation.find().populate('patient medecin');
        res.json(consultations);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.getConsultationById = async (req, res) => {
    try {
        const consultation = await Consultation.findById(req.params.id).populate('patient medecin');
        if (!consultation) {
            return res.status(404).json({ message: 'Consultation introuvable' });
        }
        res.json(consultation);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.createConsultation = async (req, res) => {
    const { patient, medecin, date, diagnostic, traitement } = req.body;
    try {
        const nouvelleConsultation = new Consultation({ patient, medecin, date, diagnostic, traitement });
        await nouvelleConsultation.save();
        res.json(nouvelleConsultation);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.updateConsultation = async (req, res) => {
    const { patient, medecin, date, diagnostic, traitement } = req.body;
    try {
        const consultation = await Consultation.findById(req.params.id);
        if (!consultation) {
            return res.status(404).json({ message: 'Consultation introuvable' });
        }
        consultation.patient = patient;
        consultation.medecin = medecin;
        consultation.date = date;
        consultation.diagnostic = diagnostic;
        consultation.traitement = traitement;
        await consultation.save();
        res.json(consultation);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.deleteConsultation = async (req, res) => {
    try {
        const consultation = await Consultation.findById(req.params.id);
        if (!consultation) {
            return res.status(404).json({ message: 'Consultation introuvable' });
        }
        await consultation.remove();
        res.json({ message: 'Consultation supprimée' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

const Prescription = require('../models/Prescription.model');

exports.getListePrescriptions = async (req, res) => {
    try {
        const listePrescriptions = await Prescription.find().populate('medicament medecin patient');
        res.json(listePrescriptions);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.getPrescriptionById = async (req, res) => {
    try {
        const prescription = await Prescription.findById(req.params.id).populate('medicament medecin patient');
        if (!prescription) {
            return res.status(404).json({ message: 'Prescription introuvable' });
        }
        res.json(prescription);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.ajouterPrescription = async (req, res) => {
    const { medicament, medecin, patient, dateDebut, dateFin, dosage, duree } = req.body;
    try {
        const nouvellePrescription = new Prescription({ medicament, medecin, patient, dateDebut, dateFin, dosage, duree });
        await nouvellePrescription.save();
        res.json(nouvellePrescription);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.modifierPrescription = async (req, res) => {
    const { medicament, medecin, patient, dateDebut, dateFin, dosage, duree } = req.body;
    try {
        const prescription = await Prescription.findById(req.params.id);
        if (!prescription) {
            return res.status(404).json({ message: 'Prescription introuvable' });
        }
        prescription.medicament = medicament;
        prescription.medecin = medecin;
        prescription.patient = patient;
        prescription.dateDebut = dateDebut;
        prescription.dateFin = dateFin;
        prescription.dosage = dosage;
        prescription.duree = duree;
        await prescription.save();
        res.json(prescription);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.supprimerPrescription = async (req, res) => {
    try {
        const prescription = await Prescription.findById(req.params.id);
        if (!prescription) {
            return res.status(404).json({ message: 'Prescription introuvable' });
        }
        await prescription.remove();
        res.json({ message: 'Prescription supprimée avec succès' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

const CabinetMedical = require('../models/CabinetMedical.model');

exports.getAllCabinets = async (req, res) => {
    try {
        const cabinets = await CabinetMedical.find();
        res.status(200).json(cabinets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCabinet = async (req, res) => {
    const cabinet = new CabinetMedical({
        nom: req.body.nom,
        adresse: req.body.adresse,
        telephone: req.body.telephone,
    });

    try {
        const newCabinet = await cabinet.save();
        res.status(201).json(newCabinet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getCabinetById = async (req, res) => {
    try {
        const cabinet = await CabinetMedical.findById(req.params.id);
        res.status(200).json(cabinet);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.updateCabinet = async (req, res) => {
    try {
        const updatedCabinet = await CabinetMedical.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedCabinet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCabinet = async (req, res) => {
    try {
        await CabinetMedical.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Cabinet deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

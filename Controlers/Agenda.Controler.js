const Agenda = require('../models/Agenda.model');


exports.createAgenda = async (req, res, next) => {
    const { medecin, dateDebut, dateFin } = req.body;
    try {
        const agenda = new Agenda({ medecin, dateDebut, dateFin });
        const createdAgenda = await agenda.save();
        res.status(201).json(createdAgenda);
    } catch (error) {
        next(error);
    }
};

exports.updateAgenda = async (req, res, next) => {
    const { medecin, dateDebut, dateFin } = req.body;
    try {
        const updatedAgenda = await Agenda.findByIdAndUpdate(
            req.params.id,
            { medecin, dateDebut, dateFin },
            { new: true }
        );
        res.status(200).json(updatedAgenda);
    } catch (error) {
        next(error);
    }
};

exports.deleteAgenda = async (req, res, next) => {
    try {
        await Agenda.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Agenda deleted' });
    } catch (error) {
        next(error);
    }
};

exports.getAgendas = async (req, res, next) => {
    try {
        console.log("Requête reçue pour obtenir les agendas");
        const agendas = await Agenda.find();
        console.log("Agendas récupérés :", agendas);
        res.status(200).json(agendas);
    } catch (error) {
        console.log("Erreur lors de la récupération des agendas :", error);
        next(error);
    }
};


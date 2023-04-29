// controllers/medecinController.js

const Medecin = require('../models/Medecin.model');

exports.getListeMedecins = async (req, res) => {
    try {
        const listeMedecins = await Medecin.find().populate('utilisateur', 'nom prenom');
        res.json(listeMedecins);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.getMedecinById = async (req, res) => {
    try {
        const medecin = await Medecin.findById(req.params.id).populate('utilisateur', 'nom prenom');
        if (!medecin) {
            return res.status(404).json({ message: 'Médecin introuvable' });
        }
        res.json(medecin);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.ajouterMedecin = async (req, res) => {
    const { nom, prenom, email, motDePasse, telephone, adresse, specialite } = req.body;
    try {
        // On crée un nouvel utilisateur
        const nouvelUtilisateur = new Utilisateur({ nom, prenom, email, motDePasse, telephone, adresse });
        // On sauvegarde le nouvel utilisateur dans la base de données
        await nouvelUtilisateur.save();
        // On crée un nouveau médecin associé à l'utilisateur créé précédemment
        const nouveauMedecin = new Medecin({ utilisateur: nouvelUtilisateur._id, specialite });
        // On sauvegarde le nouveau médecin dans la base de données
        await nouveauMedecin.save();
        res.json(nouveauMedecin);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.modifierMedecin = async (req, res) => {
    const { nom, prenom, email, motDePasse, telephone, adresse, specialite } = req.body;
    try {
        // On recherche le médecin dans la base de données
        const medecin = await Medecin.findById(req.params.id);
        if (!medecin) {
            return res.status(404).json({ message: 'Médecin introuvable' });
        }
        // On met à jour les informations de l'utilisateur associé au médecin
        medecin.utilisateur.nom = nom;
        medecin.utilisateur.prenom = prenom;
        medecin.utilisateur.email = email;
        medecin.utilisateur.motDePasse = motDePasse;
        medecin.utilisateur.telephone = telephone;
        medecin.utilisateur.adresse = adresse;
        // On met à jour la spécialité du médecin
        medecin.specialite = specialite;
        // On sauvegarde les modifications dans la base de données
        await medecin.utilisateur.save();
        await medecin.save();
        res.json(medecin);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.supprimerMedecin = async (req, res) => {
    try {
// On recherche le médecin dans la base de données
        const medecin = await Medecin.findById(req.params.id);
        if (!medecin) {
            return res.status(404).json({ message: 'Médecin introuvable' });
        }
// On supprime d'abord l'utilisateur associé au médecin
        await Utilisateur.findByIdAndRemove(medecin.utilisateur);
// On supprime ensuite le médecin
        await medecin.remove();
        res.json({ message: 'Médecin supprimé avec succès' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};
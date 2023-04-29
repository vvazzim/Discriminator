const Utilisateur = require('../models/Utilisateur.model');

exports.getListeUtilisateurs = async (req, res) => {
    try {
        const listeUtilisateurs = await Utilisateur.find();
        res.json(listeUtilisateurs);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.getUtilisateurById = async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findById(req.params.id);
        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }
        res.json(utilisateur);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.ajouterUtilisateur = async (req, res) => {
    const { nom, prenom, email, motDePasse, telephone, adresse } = req.body;
    try {
        const nouvelUtilisateur = new Utilisateur({ nom, prenom, email, motDePasse, telephone, adresse });
        await nouvelUtilisateur.save();
        res.json(nouvelUtilisateur);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.modifierUtilisateur = async (req, res) => {
    const { nom, prenom, email, motDePasse, telephone, adresse } = req.body;
    try {
        const utilisateur = await Utilisateur.findById(req.params.id);
        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }
        utilisateur.nom = nom;
        utilisateur.prenom = prenom;
        utilisateur.email = email;
        utilisateur.motDePasse = motDePasse;
        utilisateur.telephone = telephone;
        utilisateur.adresse = adresse;
        await utilisateur.save();
        res.json(utilisateur);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.supprimerUtilisateur = async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findById(req.params.id);
        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }
        await utilisateur.remove();
        res.json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

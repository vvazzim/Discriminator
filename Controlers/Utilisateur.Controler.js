const { Utilisateur, Patient, Medecin, Assistant } = require('../models/Utilisateur.model');
const models = require('../models/Utilisateur.model');
const { login, hashPassword } = require('../middleware/auth');


exports.getListeUtilisateurs = async (req, res) => {
    const typeUtilisateur = req.query.typeUtilisateur;
    let Model;
    switch(typeUtilisateur) {
        case 'Patient':
            Model = Patient;
            break;
        case 'Medecin':
            Model = Medecin;
            break;
        case 'Assistant':
            Model = Assistant;
            break;
        default:
            return res.status(400).send('Type d\'utilisateur non valide');
    }
    try {
        const listeUtilisateurs = await Model.find();
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
    const { email, password, nom, prenom, telephone, adresse, typeUtilisateur, ...additionalInfo } = req.body;
    try {
        let newUser;
        const userInfo = { email, nom, prenom, telephone, adresse, typeUtilisateur };

        // Chiffrer le mot de passe
        const hashedPassword = await hashPassword(password);

        switch (typeUtilisateur) {
            case 'Patient':
                newUser = new models.Patient({ ...userInfo, password: hashedPassword, ...additionalInfo });
                break;
            case 'Medecin':
                newUser = new models.Medecin({ ...userInfo, password: hashedPassword, ...additionalInfo });
                break;
            case 'Assistant':
                newUser = new models.Assistant({ ...userInfo, password: hashedPassword, ...additionalInfo });
                break;
            default:
                return res.status(400).send('Type d\'utilisateur non valide');
        }

        await newUser.save();
        res.status(201).json(newUser);
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
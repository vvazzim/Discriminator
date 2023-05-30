const { Utilisateur, Patient, Medecin, Assistant } = require('../models/Utilisateur.model');
const models = require('../models/Utilisateur.model');
const { login, hashPassword } = require('../middleware/auth');
const Cabinet = require('../models/CabinetMedical.model');



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
    const { email, motDePasse, nom, prenom, telephone, adresse, typeUtilisateur, cabinetId, ...additionalInfo } = req.body;

    try {
        let newUser;
        const userInfo = { email, nom, prenom, telephone, adresse, typeUtilisateur };

        console.log('motDePasse:', motDePasse);
        console.log(req.body);
        console.log(motDePasse);

        // Chiffrer le mot de passe
        const hashedPassword = await hashPassword(motDePasse);

        console.log('hashedPassword:', hashedPassword);

        // Check if the cabinet exists
        const cabinet = await Cabinet.findById(cabinetId);
        if (!cabinet) {
            console.error("Cabinet not found with id: ", cabinetId);
            return res.status(404).send('Cabinet not found');
        }

        switch (typeUtilisateur) {
            case 'Patient':
                newUser = new models.Patient({ ...userInfo, motDePasse: hashedPassword, ...additionalInfo });
                break;
            case 'Medecin':
                newUser = new models.Medecin({ ...userInfo, motDePasse: hashedPassword, cabinets: [cabinetId], ...additionalInfo });
                break;
            case 'Assistant':
                newUser = new models.Assistant({ ...userInfo, motDePasse: hashedPassword, ...additionalInfo });
                break;
            default:
                return res.status(400).send('Type d\'utilisateur non valide');
        }


        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error while adding user: ", error);
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
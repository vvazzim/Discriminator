const Assistant = require('../models/Assistant.model');
const Utilisateur = require('../models/Utilisateur.model');

exports.getListeAssistants = async (req, res) => {
    try {
        const listeAssistants = await Assistant.find().populate('utilisateur', 'nom prenom');
        res.json(listeAssistants);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.getAssistantById = async (req, res) => {
    try {
        const assistant = await Assistant.findById(req.params.id).populate('utilisateur', 'nom prenom');
        if (!assistant) {
            return res.status(404).json({ message: 'Assistant introuvable' });
        }
        res.json(assistant);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.ajouterAssistant = async (req, res) => {
    const { nom, prenom, email, motDePasse, telephone, adresse, cabinetMedical } = req.body;
    try {
        // On crée un nouvel utilisateur
        const nouvelUtilisateur = new Utilisateur({
            nom,
            prenom,
            email,
            motDePasse,
            telephone,
            adresse,
            typeUtilisateur: 'assistant'
        });
        // On sauvegarde le nouvel utilisateur dans la base de données
        await nouvelUtilisateur.save();
        // On crée un nouvel assistant associé à l'utilisateur créé précédemment
        const nouvelAssistant = new Assistant({
            utilisateur: nouvelUtilisateur._id,
            nom,
            prenom,
            email,
            motDePasse,
            telephone,
            adresse,
            cabinetMedical,
            typeUtilisateur: 'assistant' // Ajoutez cette ligne si nécessaire
        });
        // On sauvegarde le nouvel assistant dans la base de données
        await nouvelAssistant.save();
        res.json(nouvelAssistant);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};




exports.modifierAssistant = async (req, res) => {
    const { nom, prenom, email, motDePasse, telephone, adresse } = req.body;
    try {
        // On recherche l'assistant dans la base de données
        const assistant = await Assistant.findById(req.params.id);
        if (!assistant) {
            return res.status(404).json({ message: 'Assistant introuvable' });
        }
        // On met à jour les informations de l'utilisateur associé à l'assistant
        assistant.utilisateur.nom = nom;
        assistant.utilisateur.prenom = prenom;
        assistant.utilisateur.email = email;
        assistant.utilisateur.motDePasse = motDePasse;
        assistant.utilisateur.telephone = telephone;
        assistant.utilisateur.adresse = adresse;
        // On sauvegarde les modifications dans la base de données
        await assistant.utilisateur.save();
        await assistant.save();
        res.json(assistant);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.supprimerAssistant = async (req, res) => {
    try {
        // On supprime l'utilisateur associé à l'assistant
        await Utilisateur.findByIdAndDelete(req.params.id);
        // On supprime l'assistant lui-même
        await Assistant.findOneAndDelete({ utilisateur: req.params.id });
        res.json({ message: 'Assistant supprimé' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

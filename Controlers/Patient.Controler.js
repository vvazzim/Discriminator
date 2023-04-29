const Patient = require('../models/Patient.model');

exports.getListePatients = async (req, res) => {
    try {
        const listePatients = await Patient.find().populate('utilisateur', 'nom prenom');
        res.json(listePatients);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id).populate('utilisateur', 'nom prenom');
        if (!patient) {
            return res.status(404).json({ message: 'Patient introuvable' });
        }
        res.json(patient);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.ajouterPatient = async (req, res) => {
    const { nom, prenom, email, motDePasse, telephone, adresse, dateDeNaissance, sexe } = req.body;
    try {
        // On crée un nouvel utilisateur
        const nouvelUtilisateur = new Utilisateur({ nom, prenom, email, motDePasse, telephone, adresse });
        // On sauvegarde le nouvel utilisateur dans la base de données
        await nouvelUtilisateur.save();
        // On crée un nouveau patient associé à l'utilisateur créé précédemment
        const nouveauPatient = new Patient({ utilisateur: nouvelUtilisateur._id, dateDeNaissance, sexe });
        // On sauvegarde le nouveau patient dans la base de données
        await nouveauPatient.save();
        res.json(nouveauPatient);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.modifierPatient = async (req, res) => {
    const { nom, prenom, email, motDePasse, telephone, adresse, dateDeNaissance, sexe } = req.body;
    try {
        // On recherche le patient dans la base de données
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient introuvable' });
        }
        // On met à jour les informations de l'utilisateur associé au patient
        patient.utilisateur.nom = nom;
        patient.utilisateur.prenom = prenom;
        patient.utilisateur.email = email;
        patient.utilisateur.motDePasse = motDePasse;
        patient.utilisateur.telephone = telephone;
        patient.utilisateur.adresse = adresse;
        // On met à jour la date de naissance et le sexe du patient
        patient.dateDeNaissance = dateDeNaissance;
        patient.sexe = sexe;
        // On sauvegarde les modifications dans la base de données
        await patient.utilisateur.save();
        await patient.save();
        res.json(patient);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.supprimerPatient = async (req, res) => {
    try {
        // On recherche le patient dans la base de données
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient introuvable' });
        }
        // On supprime l'utilisateur associé au patient de la base de données
        await patient.utilisateur.remove();
        res.json({ message: 'Patient supprimé avec succès' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};


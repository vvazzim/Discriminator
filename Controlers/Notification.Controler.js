const Notification = require('../models/Notification.model');

exports.getListeNotifications = async (req, res) => {
    try {
        const listeNotifications = await Notification.find();
        res.json(listeNotifications);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.getNotificationById = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification introuvable' });
        }
        res.json(notification);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.ajouterNotification = async (req, res) => {
    const { titre, contenu, destinataire } = req.body;
    try {
        const nouvelleNotification = new Notification({ titre, contenu, destinataire });
        await nouvelleNotification.save();
        res.json(nouvelleNotification);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.modifierNotification = async (req, res) => {
    const { titre, contenu, destinataire } = req.body;
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification introuvable' });
        }
        notification.titre = titre;
        notification.contenu = contenu;
        notification.destinataire = destinataire;
        await notification.save();
        res.json(notification);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

exports.supprimerNotification = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification introuvable' });
        }
        await notification.remove();
        res.json({ message: 'Notification supprimée avec succès' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur du serveur');
    }
};

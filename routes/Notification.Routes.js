const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const notificationController = require('../Controlers/Notification.Controler');

router.get('/', auth(['medecin', 'secretaire', 'patient']), notificationController.getListeNotifications);
router.get('/:id', auth(['medecin', 'secretaire', 'patient']), notificationController.getNotificationById);
router.post('/', auth(['medecin', 'secretaire']), notificationController.ajouterNotification);
router.put('/:id', auth(['medecin', 'secretaire']), notificationController.modifierNotification);
router.delete('/:id', auth(['medecin', 'secretaire']), notificationController.supprimerNotification);

module.exports = router;

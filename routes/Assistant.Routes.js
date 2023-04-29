const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const assistantController = require('../Controlers/Assistant.Controler');

router.get('/', auth('administrateur'), assistantController.getListeAssistants);
router.get('/:id', auth('administrateur'), assistantController.getAssistantById);
router.post('/', auth('administrateur'), assistantController.ajouterAssistant);
router.put('/:id', auth('administrateur'), assistantController.modifierAssistant);
router.delete('/:id', auth('administrateur'), assistantController.supprimerAssistant);

module.exports = router;

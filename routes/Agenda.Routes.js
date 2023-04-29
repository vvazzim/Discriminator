const express = require('express');
const router = express.Router();
const agendaController = require('../Controlers/Agenda.Controler');

router.get('/', agendaController.getAgendas);
router.post('/', agendaController.createAgenda);
router.put('/:id', agendaController.updateAgenda);
router.delete('/:id', agendaController.deleteAgenda);

module.exports = router;

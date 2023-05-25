const express = require('express');
const router = express.Router();
const auditLogController = require('../Controlers/Audit.Controler');

// Route pour récupérer tous les journaux d'audit
router.get('/', auditLogController.getAllAuditLogs);

// Route pour récupérer un journal d'audit par ID
router.get('/:id', auditLogController.getAuditLogById);

module.exports = router;

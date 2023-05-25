const AuditLog = require('../models/Audit.Model');

// Contrôleur pour récupérer tous les journaux d'audit
exports.getAllAuditLogs = async (req, res) => {
    try {
        const auditLogs = await AuditLog.find().populate('utilisateur');
        res.status(200).json(auditLogs);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des journaux d\'audit.' });
    }
};

// Contrôleur pour récupérer un journal d'audit par ID
exports.getAuditLogById = async (req, res) => {
    try {
        const { id } = req.params;
        const auditLog = await AuditLog.findById(id).populate('utilisateur');
        if (!auditLog) {
            return res.status(404).json({ error: 'Journal d\'audit non trouvé.' });
        }
        res.status(200).json(auditLog);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du journal d\'audit.' });
    }
};

const AuditLog = require('../models/Audit.Model');

const auditLogger = async (doc, action) => {
    const loggedUser = getUserFromContext(); // TODO: implémenter cette fonction pour récupérer l'utilisateur actuellement connecté.

    const auditLog = new AuditLog({
        utilisateur: loggedUser._id,
        action: action,
        collectionType: doc.constructor.modelName,
        collectionId: doc._id,
        oldValues: doc._doc,
        newValues: doc.isModified() ? doc.getChanges() : {},
    });

    try {
        const savedAuditLog = await auditLog.save();
        console.log('Audit log saved:', savedAuditLog);
    } catch (error) {
        console.error('Error saving audit log:', error);
        throw error;
    }
};

module.exports = auditLogger;

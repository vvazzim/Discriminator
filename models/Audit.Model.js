const mongoose = require('mongoose');
const { Schema } = mongoose;

const auditLogSchema = new Schema({
    utilisateur: { type: Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
    action: { type: String, enum: ['CREATE', 'UPDATE', 'DELETE'], required: true },
    date: { type: Date, default: Date.now },
    collectionType: { type: String, required: true },
    collectionId: { type: Schema.Types.ObjectId, required: true },
    oldValues: { type: Schema.Types.Mixed },
    newValues: { type: Schema.Types.Mixed },
});

const AuditLog = mongoose.model('AuditLog', auditLogSchema);
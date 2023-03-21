const mongoose = require('mongoose');

const assistantSchema = new mongoose.Schema({
    id_assistant: {
        type: Number,
        required: true
    },
    cabinet: {
        type: String,
        ref: 'CabinetMedical',
        required: true
    }
});

const AssistantModel = mongoose.model('assistant', assistantSchema);



module.exports = AssistantModel;

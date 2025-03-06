'use strict';
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: '⚠️ Insira o nome da tarefa'
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'ongoing', 'completed'],
        default: 'pending'
    }
});

module.exports = mongoose.model('Tasks', TaskSchema);

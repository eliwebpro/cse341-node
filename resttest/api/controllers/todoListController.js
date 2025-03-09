'use strict';
const mongoose = require('mongoose');
const Task = require('../models/todoListModel');  // Importando o modelo corretamente


// 📌 Listar todas as tarefas
exports.list_all_tasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 📌 Criar uma nova tarefa
exports.create_a_task = async (req, res) => {
    try {
        const newTask = new Task(req.body);
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 📌 Buscar uma tarefa pelo ID
exports.read_a_task = async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        if (!task) return res.status(404).json({ message: "❌ Tarefa não encontrada" });
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 📌 Atualizar uma tarefa pelo ID
exports.update_a_task = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
        if (!updatedTask) return res.status(404).json({ message: "❌ Tarefa não encontrada" });
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 📌 Remover uma tarefa pelo ID
exports.delete_a_task = async (req, res) => {
    try {
        const deletedTask = await Task.deleteOne({ _id: req.params.taskId });
        if (deletedTask.deletedCount === 0) return res.status(404).json({ message: "❌ Tarefa não encontrada" });
        res.status(200).json({ message: "✅ Tarefa deletada com sucesso" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

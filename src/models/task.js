// src/models/Tarefa.js

const db = require('../config/db');

async function createTask(descricao, usuario_id, categoria_id) {
    const insertQuery = 'INSERT INTO tarefas (descricao, usuario_id, categoria_id) VALUES (?, ?, ?)';
    const result = await db.query(insertQuery, [descricao, usuario_id, categoria_id]);
    return result.insertId;
}

async function getAllTasks() {
    const selectQuery = 'SELECT * FROM tarefas';
    const tarefas = await db.query(selectQuery);
    return tarefas;
}

async function getTaskById(id) {
    const selectQuery = 'SELECT * FROM tarefas WHERE id = ?';
    const [tarefa] = await db.query(selectQuery, [id]);    
    return tarefa;
}

async function updateTask(id, descricao, status, prioridade) {
    const updateQuery = 'UPDATE tarefas SET descricao = ?, status = ?, prioridade = ? WHERE id = ?';
    const result = await db.query(updateQuery, [descricao, status, prioridade, id]);

    if (result.affectedRows === 0) {
        throw new Error('Tarefa não encontrada');
    }
    return result;
}

async function deleteTask(id) {
    const deleteQuery = 'DELETE FROM tarefas WHERE id = ?';
    const result = await db.query(deleteQuery, [id]);

    if (result.affectedRows === 0) {
        throw new Error('Tarefa não encontrada');
    }
    return result;
}

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};

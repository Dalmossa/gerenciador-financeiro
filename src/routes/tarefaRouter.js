// src/routes/tarefaRouter.js

const express = require('express');
const router = express.Router();
const { 
    addTarefa,
    getTarefas,
    getTarefaById,
    updateTarefa,
    deleteTarefa 
} = require('../models/Tarefa'); // Importa as funções do modelo Tarefa
/*
const Tarefa =  require('../models/Tarefa'); // Importa o modelo Tarefa
const addTarefa = await Tarefa.addTarefa();
const getTarefas = await Tarefa.getTarefas();
const getTarefaById = await Tarefa.getTarefaById();
const updateTarefa = await Tarefa.updateTarefa();
const deleteTarefa =  await Tarefa.deleteTarefa();
*/

// Endpoint para adicionar uma nova tarefa
router.post('/', async (req, res) => {
    const { descricao, usuario_id, categoria_id } = req.body; // Supondo que você tenha esses campos no corpo da requisição
    try {
        const tarefaId = await addTarefa(descricao, usuario_id, categoria_id);
        res.status(201).json({ id: tarefaId });
    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        res.status(500).json({ message: 'Erro ao criar tarefa' });
    }
});

// Endpoint para buscar todas as tarefas
router.get('/', async (req, res) => {
    try {
        const tarefas = await getTarefas();
        res.json(tarefas);
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        res.status(500).json({ message: 'Erro ao buscar tarefas' });
    }
});

// Endpoint para buscar uma tarefa pelo ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const tarefa = await getTarefaById(id);
        if (!tarefa) {
            return res.status(404).json({ message: 'Tarefa não encontrada' });
        }
        res.json(tarefa);
    } catch (error) {
        console.error('Erro ao buscar tarefa:', error);
        res.status(500).json({ message: 'Erro ao buscar tarefa' });
    }
});

// Endpoint para atualizar uma tarefa pelo ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { descricao, status, prioridade } = req.body;

    try {
        await updateTarefa(id, descricao, status, prioridade);
        res.json({ message: 'Tarefa atualizada com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
        res.status(500).json({ message: 'Erro ao atualizar tarefa' });
    }
});

// Endpoint para excluir uma tarefa pelo ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await deleteTarefa(id);
        res.json({ message: 'Tarefa excluída com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir tarefa:', error);
        res.status(500).json({ message: 'Erro ao excluir tarefa' });
    }
});

// Exporta o roteador para uso em outros módulos
module.exports = router;
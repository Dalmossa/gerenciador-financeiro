// src/routes/tarefaRouter.js

// Importação dos módulos
const express = require('express');
const router = express.Router();
const controllerTask = require('../controllers/taskController'); // Importa as funções do controlador Tarefa

// Rota para criar uma nova tarefa
router.post('/', controllerTask.createTask);

// Rota para obter todas as tarefas
router.get('/', controllerTask.getAllTasks);

// Rota para obter uma tarefa específica pelo ID
router.get('/:id', controllerTask.getTaskById);

// Rota para atualizar uma tarefa existente
router.put('/:id', controllerTask.updateTask);

// Rota para deletar uma tarefa
router.delete('/:id', controllerTask.deleteTask);

// Exporta o roteador para uso em outros módulos
module.exports = router;
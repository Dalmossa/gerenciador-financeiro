// src/routes/categoriaRouter.js/
/**
 * Este módulo tem a responsabilidade de tratar as rotas
 * encaminhando as requisições para seus respequitivos metodos que,
 * são responsaveis por tratar  as requisições e retornar as respostas
 * ao cliente.
 */
// importação dos framework
const express = require('express');
const router = express.Router();
const categoryControllers = require('../controllers/categoryControllers'); // Importar as funções do controlador de Usuário.

// Endpoint para adicionar um novo usuário
router.post('/', categoryControllers.createCategory);


// Endpoint para buscar todos os usuários

router.get('/', categoryControllers.getAllCategory);


 
// Endpoint para buscar um usuário pelo ID
router.get('/:id',  categoryControllers.getCategoryById);


// Endpoint para atualizar um usuário pelo ID
router.put('/:id', categoryControllers.updateCategory);



// Endpoint para excluir um usuário pelo ID
router.delete('/:id', categoryControllers.deleteCategory);

// EndPoint para excluir todas as categoria
router.delete('/', categoryControllers.deleteAllCategory);



// Exporta o roteador para uso em outros módulos
module.exports = router;
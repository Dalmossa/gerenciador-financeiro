// src/routes/usuarioRouter.js
/**
 * Este módulo tem a responsabilidade de tratar as rotas
 * encaminhando as requisições para seus respequitivos metodos que,
 * são responsaveis por tratar  as requisições e retornar as respostas
 * ao cliente.
 */
// importação dos framework
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioControllers'); // Importar as funções do controlador de Usuário.

// Endpoint para adicionar um novo usuário
router.post('/', usuarioController.createUser);


// Endpoint para buscar todos os usuários

router.get('/', usuarioController.getAllUser);


 
// Endpoint para buscar um usuário pelo ID
router.get('/:id',  usuarioController.getUserById);


// Endpoint para atualizar um usuário pelo ID
router.put('/:id', usuarioController.updateUser);



// Endpoint para excluir um usuário pelo ID
router.delete('/:id', usuarioController.deleteUser);





// Exporta o roteador para uso em outros módulos
module.exports = router;
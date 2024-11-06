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
const { createSubcategory, 
        getAllSubcategory, 
        getSubcategoryById,
        updateSubcategory, 
        deleteSubcategory } = require('../controllers/subcategoryController'); // Importar as funções do controlador de Usuário.

// Endpoint para adicionar um novo usuário
router.post('/', createSubcategory);


// Endpoint para buscar todos os usuários

router.get('/',getAllSubcategory);


 
// Endpoint para buscar um usuário pelo ID
router.get('/:id', getSubcategoryById);


// Endpoint para atualizar um usuário pelo ID
router.put('/:id', updateSubcategory);



// Endpoint para excluir um usuário pelo ID
router.delete('/:id', deleteSubcategory);



// Exporta o roteador para uso em outros módulos
module.exports = router;
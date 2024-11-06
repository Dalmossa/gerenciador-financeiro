// src/routes/categoriaRouter.js

// importando o Módulo Category, ele é o responsável pela interação com o banco de dados

const ModuloCategory  = require('../models/Category');
const { validationResult } = require('express-validator');

// Função que vai tratar a requisição que vem do cliente e enviá-la para o servidor
async function createCategory(req, res) {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

    const { nome } = req.body; // Supondo que você tenha um campo nome
    try {
        const categoriaId = await ModuloCategory.createCategory(nome);
        res.status(201).json({ id: categoriaId });
    } catch (error) {
        console.error('Erro ao criar categoria:', error);
        res.status(500).json({ message: 'Erro ao criar categoria' });
    }

};

// Função para buscar todas as categorias
async function getAllCategory(req, res) {
  
    try {
        const categorias = await ModuloCategory.getAllCategory();
        res.json(categorias);
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        res.status(500).json({ message: 'Erro ao buscar categorias' });
    }

};

// Função para buscar uma categoria pelo ID
async function getCategoryById(req, res) {
 
const { id } = req.params;
try {
    const categoria = await ModuloCategory.getCategoryById(id);
    if (!categoria) {
        return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    res.json(categoria);
} catch (error) {
    console.error('Erro ao buscar categoria:', error);
    res.status(500).json({ message: 'Erro ao buscar categoria' });
}

};

// função  para atualizar uma categoria pelo ID
async function updateCategory(req, res) {
  
    const { id } = req.params;
    const { nome } = req.body;

    try {
        await ModuloCategory.updateCategory(id, nome);
        res.json({ message: 'Categoria atualizada com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar categoria:', error);
        res.status(500).json({ message: 'Erro ao atualizar categoria' });
    }
};

// Função  para excluir uma categoria pelo ID
async function deleteCategory(req, res) {
  
    const { id } = req.params;

    try {
        await ModuloCategory.deleteCategory(id);
        res.json({ message: 'Categoria excluída com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir categoria:', error);
        res.status(500).json({ message: 'Erro ao excluir categoria' });
    }
};

async function deleteAllCategory(req, res) {
    try {
        await ModuloCategory.deleteAllCategory();
        res.json({message: 'Todas as categorias foram exluidas com sucesso!'});

    } catch (error ){
        console.error('Erro ao deletar todas as categorias');
        res.status(500).json({message: 'Erro ao deletar todas as categorias'});
    } 
    
};

// Exporta o roteador para uso em outros módulos
module.exports =  {createCategory, getAllCategory, getCategoryById, updateCategory, deleteCategory, deleteAllCategory };
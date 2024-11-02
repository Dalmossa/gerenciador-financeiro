// src/routes/categoriaRouter.js

const express = require('express');
const router = express.Router();
const { 
    addCategoria, 
    getCategorias, 
    getCategoriaById, 
    updateCategoria, 
    deleteCategoria 
} = require('../models/Categoria'); // Importe suas funções do modelo Categoria

// Endpoint para adicionar uma nova categoria
router.post('/', async (req, res) => {
    const { nome } = req.body; // Supondo que você tenha um campo nome
    try {
        const categoriaId = await addCategoria(nome);
        res.status(201).json({ id: categoriaId });
    } catch (error) {
        console.error('Erro ao criar categoria:', error);
        res.status(500).json({ message: 'Erro ao criar categoria' });
    }
});

// Endpoint para buscar todas as categorias
router.get('/', async (req, res) => {
    try {
        const categorias = await getCategorias();
        res.json(categorias);
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        res.status(500).json({ message: 'Erro ao buscar categorias' });
    }
});

// Endpoint para buscar uma categoria pelo ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const categoria = await getCategoriaById(id);
        if (!categoria) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
        }
        res.json(categoria);
    } catch (error) {
        console.error('Erro ao buscar categoria:', error);
        res.status(500).json({ message: 'Erro ao buscar categoria' });
    }
});

// Endpoint para atualizar uma categoria pelo ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    try {
        await updateCategoria(id, nome);
        res.json({ message: 'Categoria atualizada com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar categoria:', error);
        res.status(500).json({ message: 'Erro ao atualizar categoria' });
    }
});

// Endpoint para excluir uma categoria pelo ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await deleteCategoria(id);
        res.json({ message: 'Categoria excluída com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir categoria:', error);
        res.status(500).json({ message: 'Erro ao excluir categoria' });
    }
});

// Exporta o roteador para uso em outros módulos
module.exports = router;
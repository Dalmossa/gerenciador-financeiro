const ModuloUser = require('../models/Usuario');
const { validationResult } = require('express-validator');
const formatDateToMySQL = require('../utils/module_format');

// Controlador para adicionar um novo usuário
async function createUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nome, email, senha, datacriacao } = req.body;

    try {
        const dateFormatted = formatDateToMySQL(datacriacao);
        const novoUsuario = await ModuloUser.createUser({ nome, email, senha, datacriacao: dateFormatted });
        res.status(201).json({ id: novoUsuario, message: `Usuário criado com sucesso` });
        console.log("Novo usuário criado", novoUsuario);
    } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
        res.status(500).json({ error: 'Erro ao adicionar usuário.' });
    }
}

// Controlador para obter todos os usuários
async function getAllUser(req, res) {
    try {
        const usuarios = await ModuloUser.getAllUser();
        if (usuarios.length === 0) {
            return res.status(404).json({ message: 'Nenhum usuário encontrado.' });
        }
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
}

// Controlador para obter um usuário pelo ID
async function getUserById(req, res) {
    const { id } = req.params;

    try {
        const usuario = await ModuloUser.getUserById(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar usuário.' });
    }
}

// Controlador para atualizar um usuário pelo ID
async function updateUser(req, res) {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nome, email, senha } = req.body;

    try {
        const usuarioAtualizado = await ModuloUser.updateUser(id, { nome, email, senha });
        if (usuarioAtualizado.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado para atualização.' });
        }
        res.status(200).json({ message: 'Usuário atualizado com sucesso.', usuario: usuarioAtualizado });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ error: 'Erro ao atualizar usuário.' });
    }
}

// Controlador para excluir um usuário pelo ID
async function deleteUser(req, res) {
    const { id } = req.params;

    try {
        const usuarioExistente = await ModuloUser.getUserById(id);
        if (!usuarioExistente) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        await ModuloUser.deleteUser(id);
        res.status(204).send(); // Retorna sucesso sem conteúdo
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        res.status(500).json({ error: 'Erro ao excluir usuário.' });
    }
}

module.exports = {
    createUser,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser
};

// src/models/Usuario.js

const db = require('../config/db');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

async function createUser(user) {
    const connection = await db.getConnection();
    try {
        // Validação da entrada
        const errors = validationResult(user);
        if (!errors.isEmpty()) {
            throw new Error('Dados inválidos');
        }

        const { nome, email, senha } = user;
        const hashedPassword = await bcrypt.hash(senha, 10);
        const insertQuery = `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`;
        const result = await connection.query(insertQuery, [nome, email, hashedPassword]);
        
        console.log('Usuário criado com sucesso:', nome);
        return result.insertId; // Retorna o ID do novo usuário

    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        throw new Error('Erro ao cadastrar usuário');
    } finally {
        connection.release();
    }
}

async function getAllUsers() {
    const connection = await db.getConnection();
    try {
        const selectQuery = `SELECT id, nome, email FROM usuarios`;
        const result = await connection.query(selectQuery);
        return result;
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw new Error('Erro ao buscar usuários');
    } finally {
        connection.release();
    }
}

async function getUserById(id) {
    const connection = await db.getConnection();
    try {
        const selectQuery = `SELECT * FROM usuarios WHERE id = ?`;
        const [rows] = await connection.query(selectQuery, [id]);
        if (rows.length === 0) {
            throw new Error('Usuário não encontrado');
        }
        return rows[0];
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        throw new Error('Usuário não encontrado');
    } finally {
        connection.release();
    }
}

async function updateUser(id, user) {
    const connection = await db.getConnection();
    try {
        const { nome, email, senha } = user;
        const hashedPassword = await bcrypt.hash(senha, 10);
        const updateQuery = `UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?`;
        const result = await connection.query(updateQuery, [nome, email, hashedPassword, id]);
        
        if (result.affectedRows === 0) {
            throw new Error('Usuário não encontrado');
        }
        
        console.log('Usuário atualizado com sucesso:', nome);
        return result;

    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        throw new Error('Erro ao atualizar usuário');
    } finally {
        connection.release();
    }
}

async function deleteUser(id) {
    const connection = await db.getConnection();
    try {
        const deleteQuery = `DELETE FROM usuarios WHERE id = ?`;
        const result = await connection.query(deleteQuery, [id]);
        
        if (result.affectedRows === 0) {
            throw new Error('Usuário não encontrado');
        }

        console.log('Usuário deletado com sucesso');
        return result;

    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        throw new Error('Erro ao deletar usuário');
    } finally {
        connection.release();
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
==============================================================================
// src/controllers/usuarioControllers.js

const Usuario = require('../models/Usuario');
const { validationResult } = require('express-validator');
const formatDateToMySQL = require('../models/module_format');

// Controlador para adicionar um novo usuário
async function createUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nome, email, senha, datacriacao } = req.body;

    try {
        const dateFormatted = formatDateToMySQL(datacriacao);
        const novoUsuario = await Usuario.createUser({ nome, email, senha, datacriacao: dateFormatted });
        res.status(201).json({ id: novoUsuario, message: 'Usuário criado com sucesso.' });
    } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
        res.status(500).json({ error: 'Erro ao adicionar usuário.' });
    }
}

// Controlador para obter todos os usuários
async function getAllUser(req, res) {
    try {
        const usuarios = await Usuario.getAllUser();
        if (usuarios.length === 0) {
            return res.status(200).json({ message: 'Nenhum usuário encontrado.' });
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
        const usuario = await Usuario.getUserById(id);
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
        const usuarioAtualizado = await Usuario.updateUser(id, { nome, email, senha });
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
        await Usuario.deleteUser(id);
        res.status(204).send(); // Retorna sucesso sem conteúdo
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        res.status(500).json({ error: 'Erro ao excluir usuário.' });
    }
}

// Exporta os controladores para uso nas rotas
module.exports = {
    createUser,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser,
};


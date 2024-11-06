/**
 * Módulo responsável por tratar a interação da aplicação com o banco de dados
 */

// Importando o módulo de conexão com o banco de dados
const db = require('../config/db');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const dateFormatted = require('../utils/module_format');

// Função para criar um novo usuário
async function createUser(user) {
    const connection = await db.getConnection();
    try {
        const errors = validationResult(user);
        if (!errors.isEmpty()) {
            throw new Error('Dados inválidos');
        }

        const { nome, email, senha, datacriacao } = user;
        const formattedDate = dateFormatted(datacriacao);
        const hashedPassword = await bcrypt.hash(senha, 10);

        const insertQuery = `INSERT INTO usuarios (nome, email, senha, datacriacao) VALUES (?, ?, ?, ?)`;
        const result = await connection.query(insertQuery, [nome, email, hashedPassword, formattedDate]);
        console.log('Usuário criado com sucesso');
        return result;
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        throw error;
    } finally {
        console.log('Conexão liberada');
        connection.release();
    }
};

// Função para buscar todos os usuários
async function getAllUser() {
    const connection = await db.getConnection();
    try {
        const selectQuery = `SELECT id, nome, email FROM usuarios`;
        const [result] = await connection.query(selectQuery);
        return result;
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw new Error('Erro ao buscar usuário');
    } finally {
        console.log('Conexão liberada');
        connection.release();
    }
};

// Função para buscar usuário por ID
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
        console.error('Usuário não encontrado');
        throw new Error('Usuário não encontrado');
    } finally {
        console.log('Conexão liberada');
        connection.release();
    }
};

// Função para atualizar usuário
async function updateUser(id, user) {
    const connection = await db.getConnection();
    try {
        const { nome, email, senha } = user;
        const hashedPassword = await bcrypt.hash(senha, 10);
        const updateQuery = `UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?`;

        const [result] = await connection.query(updateQuery, [nome, email, hashedPassword, id]);

        if (result.affectedRows === 0) {
            throw new Error('Usuário não encontrado');
        }

        console.log('Usuário atualizado com sucesso');
        return result;
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        throw new Error('Erro ao atualizar usuário');
    } finally {
        console.log('Conexão liberada');
        connection.release();
    }
}

// Função para deletar usuário
async function deleteUser(id) {
    const connection = await db.getConnection();
    try {
        const deleteQuery = `DELETE FROM usuarios WHERE id = ?`;
        const [result] = await connection.query(deleteQuery, [id]);

        if (result.affectedRows === 0) {
            throw new Error('Usuário não encontrado');
        }
        console.log('Usuário deletado com sucesso');
        return result;
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        throw new Error('Erro ao deletar usuário');
    } finally {
        console.log('Conexão liberada');
        connection.release();
    }
};

module.exports = {
    createUser, getAllUser, getUserById, updateUser, deleteUser
};

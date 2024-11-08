// src/models/Categoria.js

const db = require('../config/db'); // Importa a configuração da conexão com o banco de dados

// Função para adicionar uma nova categoria
async function createCategory(nome) {
    const connection = await db.getConnection();
    try {
        const insertQuery = 'INSERT INTO categorias (nome) VALUES (?)';
        const [result] = await connection.query(insertQuery, [nome]);
        console.log('Categoria criada com sucesso', result);
        return result.insertId; // Retorna o ID da nova categoria
    } catch (error) {
        console.error('Erro ao adicionar categoria:', error);
        throw error; // Lança o erro para tratamento posterior
    } finally {
        console.log('Conexão liberada');
        connection.release(); // Libera a conexão
    }
}

// Função para buscar todas as categorias
async function getAllCategory() {
    const connection = await db.getConnection();
    try {
        const selectQuery = 'SELECT * FROM categorias';
        const [rows] = await connection.query(selectQuery);
        return rows; // Retorna todas as categorias encontradas
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        throw error; // Lança o erro para tratamento posterior
    } finally {
        console.log('Conexão liberada');
        connection.release(); // Libera a conexão
    }
}

// Função para buscar uma categoria pelo ID
async function getCategoryById(id) {
    const connection = await db.getConnection();
    try {
        const selectQuery = 'SELECT * FROM categorias WHERE id = ?';
        const [rows] = await connection.query(selectQuery, [id]);
        return rows[0]; // Retorna a primeira categoria encontrada ou undefined se não existir
    } catch (error) {
        console.error('Erro ao buscar categoria:', error);
        throw error; // Lança o erro para tratamento posterior
    } finally {
        connection.release();
        console.log('Conexão liberada'); // Libera a conexão
    }
}

// Função para atualizar uma categoria pelo ID
async function updateCategory(id, nome) {
    const connection = await db.getConnection();
    try {
        const updateQuery = 'UPDATE categorias SET nome = ? WHERE id = ?';
        const [result] = await connection.query(updateQuery, [nome, id]);
        
        if (result.affectedRows === 0) {
            throw new Error('Categoria não encontrada'); // Lança erro se nenhum registro foi afetado
        }  console.log('Categoria atualizada com sucesso', result)
        
        return result; // Retorna o resultado da atualização
    } catch (error) {
        console.error('Erro ao atualizar categoria:', error);
        throw error; // Lança o erro para tratamento posterior
    } finally {
        console.log('Conexão liberada');
        connection.release(); // Libera a conexão
    }
}

// Função para excluir uma categoria pelo ID
async function deleteCategory(id) {
    const connection = await db.getConnection();
    try {
        const deleteQuery = 'DELETE FROM categorias WHERE id = ?';
        const [result] = await connection.query(deleteQuery, [id]);
        
        if (result.affectedRows === 0) {
            throw new Error('Categoria não encontrada'); // Lança erro se nenhum registro foi afetado
        }

        return result; // Retorna o resultado da exclusão
    } catch (error) {
        console.error('Erro ao excluir categoria:', error);
        throw error; // Lança o erro para tratamento posterior
    } finally {
        console.log('Conexão liberada');
        connection.release(); // Libera a conexão
    }
};

async function deleteAllCategory () {
    const connection = await db.getConnection();
    try {
        const deleteQuery = 'DELETE FROM category';
        await connection.query(deleteQuery);

    } catch (error) {
        console.error('Erro ao deletar todas as tarefas');
        throw new Error(' Erro ao deletar todas as tarefas');

    }
    finally {
        connection.release();
        console.log('Conexão liberada')
    }
};

// Exporta as funções do modelo
module.exports = { 
    createCategory,
    getAllCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
    deleteAllCategory
};
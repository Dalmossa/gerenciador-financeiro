// src/models/SubCategoria.js

const db = require('../config/db'); // Importa a configuração da conexão com o banco de dados

// Função para adicionar uma nova subcategoria
async function createSubcategory(nome, categoriaId) {
    if (!nome || !categoriaId) {
        throw new Error('Nome e categoriaId são obrigatórios');
    }    
    
    const connection = await db.getConnection();
    try {
        const insertQuery = 'INSERT INTO subcategorias (nome, categoriaId) VALUES (?,?)';
        const [result] = await connection.query(insertQuery, [nome, categoriaId] );
        console.log(result);
        return result.insertId; // Retorna o ID da nova subcategoria
    } catch (error) {
        console.error('Erro ao adicionar subcategoria:', error);
        throw error; // Lança o erro para tratamento posterior
    } finally {
        console.log('Conexão liberada');
        connection.release(); // Libera a conexão
    }

}

// Função para buscar todas as subcategorias
async function getAllSubcategory() {
    const connection = await db.getConnection();
    try {
        const selectQuery = 'SELECT * FROM subcategorias';
        const [rows] = await connection.query(selectQuery);
        return rows; // Retorna todas as subcategorias encontradas
    } catch (error) {
        console.error('Erro ao buscar subcategorias:', error);
        throw error; // Lança o erro para tratamento posterior
    } finally {
        console.log('Conexão liberada');
        connection.release(); // Libera a conexão
    }
}

// Função para buscar uma subcategoria pelo ID
async function getSubcategoryById(id) {
    const connection = await db.getConnection();
    try {
        const selectQuery = 'SELECT * FROM subcategorias WHERE id = ?';
        const [rows] = await connection.query(selectQuery, [id]);
        return rows[0]; // Retorna a primeira subcategoria encontrada ou undefined se não existir
    } catch (error) {
        console.error('Erro ao buscar subcategoria:', error);
        throw error; // Lança o erro para tratamento posterior
    } finally {
        connection.release();
        console.log('Conexão liberada'); // Libera a conexão
    }
}

// Função para atualizar uma subcategoria pelo ID
async function updateSubcategory(id, nome) {
    const connection = await db.getConnection();
    try {
        const updateQuery = 'UPDATE subcategorias SET nome = ? WHERE id = ?';
        const [result] = await connection.query(updateQuery, [nome, id]);
        
        if (result.affectedRows === 0) {
            throw new Error('Subcategoria não encontrada'); // Lança erro se nenhum registro foi afetado
        }
        
        return result; // Retorna o resultado da atualização
    } catch (error) {
        console.error('Erro ao atualizar subcategoria:', error);
        throw error; // Lança o erro para tratamento posterior
    } finally {
        console.log('Conexão liberada');
        connection.release(); // Libera a conexão
    }
}

// Função para excluir uma subcategoria pelo ID
async function deleteSubcategory(id) {
    const connection = await db.getConnection();
    try {
        const deleteQuery = 'DELETE FROM subcategorias WHERE id = ?';
        const [result] = await connection.query(deleteQuery, [id]);
        
        if (result.affectedRows === 0) {
            throw new Error('Subcategoria não encontrada'); // Lança erro se nenhum registro foi afetado
        }

        return result; // Retorna o resultado da exclusão
    } catch (error) {
        console.error('Erro ao excluir subcategoria:', error);
        throw error; // Lança o erro para tratamento posterior
    } finally {
        console.log('Conexão liberada');
        connection.release(); // Libera a conexão
    }
};



// Exporta as funções do modelo
module.exports = { 
    createSubcategory,
    getAllSubcategory,
    getSubcategoryById,
    updateSubcategory,
    deleteSubcategory,
   
};
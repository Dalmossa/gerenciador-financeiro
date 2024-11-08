// src/models/SubCategoria.js

const db = require('../config/db'); // Importa a configuração da conexão com o banco de dados
// Função para adicionar uma nova subcategoria
async function createSubcategory(nome, categoriaId, id) {
    console.log('Dados recebidos no models:', { nome, categoriaId, id }); // Log dos dados recebidos

    // Verifica se os parâmetros obrigatórios estão presentes
    if (!nome || !categoriaId) {
        console.error('Erro: Nome e Id da categoria são obrigatórios no servidor');
        throw new Error('Nome e Id da categoria são obrigatórios no servidor');
    }    
    
    let connection;
    try {
        connection = await db.getConnection(); // Tenta obter uma conexão
        console.log('Conexão ao banco de dados estabelecida.');

        const insertQuery = 'INSERT INTO subcategorias (nome, categoriaid) VALUES (?, ?)';
        const [result] = await connection.query(insertQuery, [nome, categoriaId]);
        console.log('Resultado da inserção:', result); // Log do resultado da inserção

        return result.insertId; // Retorna o ID da nova subcategoria
    } catch (error) {
        console.error('Erro ao adicionar subcategoria no servidor:', error);
        throw error; // Lança o erro para tratamento posterior
    } finally {
        if (connection) {
            console.log('Conexão liberada');
            connection.release(); // Libera a conexão
        }
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
async function updateSubcategory(id, nome, categoriaid) {
    if (!nome || !categoriaid || isNaN(categoriaid)) {
        throw new Error("Nome e categoriaId são obrigatórios e categoriaId deve ser um número.");
    }

    const connection = await db.getConnection();
    try {
        // Consultando a subcategoria para verificar se ela existe
        const selectQuery = 'SELECT * FROM subcategorias WHERE id = ?';
        const [subcategoria] = await connection.query(selectQuery, [id]);

        if (!subcategoria || subcategoria.length === 0) {
            throw new Error('Subcategoria não encontrada');
        }

        // Atualizando a subcategoria
        const updateQuery = 'UPDATE subcategorias SET nome = ?, categoriaid = ? WHERE id = ?';
        const [result] = await connection.query(updateQuery, [nome, categoriaid, id]);

        if (result.affectedRows === 0) {
            throw new Error('Erro ao atualizar a subcategoria');
        }

        return result; // Retorna o resultado da atualização
    } catch (error) {
        console.error('Erro ao atualizar subcategoria:', error);
        throw error; // Lança o erro para tratamento posterior
    } finally {
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



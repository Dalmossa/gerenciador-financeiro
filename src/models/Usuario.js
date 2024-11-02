// src/models/Usuário.js
/**
 * Módulo responsável por tratar a interação da aplicação com o banco de dados
 */
//  Importando o módulo de conexão com o banco de dados

const db = require('../config/db');

async function createUser(user) {
    const connection =  await db.getConnection();
    try {
        const { nome, email, senha, datacriacao } = user;
        const  insertQuery = `INSERT INTO usuarios (nome, email, senha, datacriacao) VALUES (?, ?, ?, ?)`;
        const result = await  connection.query(insertQuery,  [nome, email, senha, datacriacao]);
        return result && console.log('Usuário criado com sucesso:', user);
    } catch (error) {
        
        console.error('Erro ao  cadastrar usuário:', error);
        throw error;
    } finally {
        console.log('Conexão liberada');
        connection.release();
    }
};

async function getAllUser() {
    const connection = await  db.getConnection();
    try {
        const  selectQuery = `SELECT * FROM usuarios`;
        const result = await  connection.query(selectQuery);
        return result;
        
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw error;

    } finally {
       console.log('Conexão liberada')     
    }
};



async function getUserById(id) {
    const connection = await db.getConnection();
    try {
        const selectQuery = `SELECT * FROM usuarios WHERE id = ?`;
        const [rows]  = await connection.query(selectQuery, [id]);         
           if ( rows.length > 0) {
            console.log(rows)
            return rows; //rows[0];

           }   
    } catch (error) {
        rows.status(404).json({ message: 'Usuário não encontrado' });
            console.error('Usuário não encontrato');
            throw error;
    } finally {
        console.log(' Conexão  liberada');
        connection.release();
    }
};



async function updateUser(nome, email, senha, id) {
    const connection = await db.getConnection();
    try {
        const  updateQuery = `UPDATE usuarios SET nome = ?, email = ?, senha = ?,  WHERE id = ?`
        const result = await connection.query(updateQuery, [nome, email, senha, id]);
        return result;

    } catch (error) {
        console.error('Erro  ao atualizar usuário:', error);
        throw error;
    } finally {
        console.log('Conexão liberada');
        connection.release();
    }
};



async function deleteUser(insertId) {
    const connection = db.getConnection();
    try {
        const deleteQuery = `DELETE FROM usuarios WHERE id = ?`;
        const result = await connection.query(deleteQuery, [insertId]);
        return result;

    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        throw error;

    } finally {
        console.log('Conexão liberada');
        connection.release();
        
    }
};

module.exports = {
      createUser, getAllUser, getUserById, updateUser, deleteUser    
}
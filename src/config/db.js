require('dotenv').config();
const mysql = require('mysql2/promise');

let pool;

/**
 * Inicializa o pool de conexões se ainda não estiver criado.
 */
async function createPool() {
    if (!pool) {
        try {
            pool = mysql.createPool({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME,
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0,
            });
            console.log('Pool de conexão criado com sucesso.');
        } catch (error) {
            console.error('Erro ao criar o pool de conexão:', error);
            throw new Error('Erro ao tentar estabelecer conexão com o servidor');
        }
    }
    return pool;
}

/**
 * Executa uma consulta SQL usando uma conexão do pool.
 * @param {string} sql - A consulta SQL a ser executada.
 * @param {Array} [params] - Parâmetros para a consulta.
 * @returns {Promise<Array>} Resultados da consulta.
 */
async function query(sql, params = []) {
    await createPool();
    let connection;

    try {
        connection = await pool.getConnection();
        const [results] = await connection.query(sql, params);
        return results;
    } catch (error) {
        console.error('Erro na consulta ao banco de dados:', error);
        throw new Error('Erro ao realizar consulta SQL');
    } finally {
        if (connection) {
            await connection.release();
            console.log('Conexão liberada após consulta');
        }
    }
}

/**
 * Função para obter uma conexão direta, se necessário.
 * Útil para transações complexas ou operações específicas.
 */
async function getConnection() {
    await createPool();
    return pool.getConnection();
}

module.exports = { query, getConnection };

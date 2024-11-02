// /config/db.js

require('dotenv').config();
const mysql = require('mysql2/promise');

let pool;

async function createPool() {
    if (!pool) {
        try {
            console.log('Tentando criar um novo pool de conexões com as configurações de ambiente.');
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
            throw error;
        }
    }
    return pool;
}

async function getConnection() {
    if (!pool) {
        await createPool();
    }
    try {
        const connection = await pool.getConnection();
        return connection;
    } catch (error) {
        console.error('Erro ao obter conexão:', error);
        throw error;
    }
}

async function query(sql, params) {
    let connection;
    try {
        const pool = await createPool();
        connection = await pool.getConnection();
        console.log('Executando consulta SQL:', sql, 'Parâmetros:', params);
        const [results] = await connection.query(sql, params);
        console.log('Resultados da consulta:', results);
        return results;
    } catch (error) {
        console.error('Erro na consulta ao banco de dados:', error);
        throw error;
    } finally {
        if (connection) {
            await connection.release();
            console.log('Conexão liberada');
        }
    }
}

module.exports = { createPool, query, getConnection };

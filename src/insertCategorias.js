// insertCategorias.js
require('dotenv').config();
const mysql = require('mysql2/promise');

async function createPool() {
    return mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });
}

async function insertCategorias() {
    const pool = await createPool();
    
    try {
        const categorias = [
            { nome: 'Trabalho' },
            { nome: 'Pessoal' }
        ];

        for (const categoria of categorias) {
            const sql = 'INSERT INTO categorias (nome) VALUES (?)';
            await pool.query(sql, [categoria.nome]);
            console.log(`Categoria inserida: ${categoria.nome}`);
        }
    } catch (error) {
        console.error('Erro ao inserir categorias:', error);
    } finally {
        await pool.end(); // Fecha o pool de conexões
    }
}

// Chama a função para inserir as categorias
insertCategorias();

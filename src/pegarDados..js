// getCategorias.js
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

export async function getCategorias() {
    const pool = await createPool();
    
    try {
        // Consulta para buscar todas as categorias
        const [rows] = await pool.query('SELECT * FROM categorias');
        
        // Exibe as categorias no console
        console.log('Categorias atuais no banco de dados:', rows);
        
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
    } finally {
        await pool.end(); // Fecha o pool de conexões
    }
}

// Chama a função para consultar as categorias
getCategorias();

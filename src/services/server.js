// Importa as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Importa o módulo mysql2 com suporte a promessas
const mysql = require('mysql2/promise');

// Declara uma variável para armazenar o pool de conexões
let pool;

// Função assíncrona para criar um pool de conexões com o banco de dados
async function createPool() {
    // Verifica se o pool ainda não foi criado
    if (!pool) {
        try {
            // Log para verificar as variáveis de ambiente
            console.log('Tentando criar um novo pool de conexões com as seguintes configurações:');
            console.log(`Host: ${process.env.DB_HOST}`);
            console.log(`User: ${process.env.DB_USER}`);
            console.log(`Database: ${process.env.DB_NAME}`);

            // Cria um novo pool de conexões com as configurações do banco de dados
            pool = mysql.createPool({
                host: process.env.DB_HOST,     // Endereço do host do banco de dados
                user: process.env.DB_USER,     // Nome do usuário do banco de dados
                password: process.env.DB_PASS,  // Senha do usuário do banco de dados
                database: process.env.DB_NAME,  // Nome do banco de dados a ser utilizado
                waitForConnections: true,        // Permite aguardar por novas conexões
                connectionLimit: 10,            // Limite máximo de conexões simultâneas
                queueLimit: 0,                  // Limite da fila de espera (0 significa sem limite)
            });
            console.log('Pool de conexão criado com sucesso.'); // Mensagem de sucesso
        } catch (error) {
            console.error('Erro ao criar o pool de conexão:', error); // Mensagem de erro ao criar o pool
            throw error; // Re-lança o erro para que o chamador saiba que houve um erro
        }
    } else { 
        console.log('Usando pool de conexão existente.'); // Informa que um pool existente está sendo usado
    }
    return pool; // Retorna o pool de conexões (novo ou existente)
}

// Função assíncrona para executar uma consulta SQL no banco de dados
async function query(sql, params) {
    let connection;
    try {
         const pool = await createPool(); // Chama createPool para garantir que o pool esteja criado

        connection = await pool.getConnection(); // Uso do getConnection para obter uma onexão

        // Log da consulta SQL e dos parâmetros fornecidos
        console.log('Executando consulta SQL:', sql);
        console.log('Parâmetros:', params);

        const [results] = await connection.query(sql, params); // Executa a consulta SQL com os parâmetros fornecidos
        
        console.log('Resultados da consulta:', results); // Log dos resultados da consulta

        return results; // Retorna os resultados da consulta
    } catch (error) {
        console.error('Erro na consulta ao banco de dados:', error); // Mensagem de erro ao executar a consulta
        throw error; // Re-lança o erro para tratamento posterior
    } finally {
        if (connection) {
            await connection.release(); // Libera a conexão automaticamente se estiver usando pool
            console.log('Conexão liberada') // Log Liberando a conexão
        }
    }
}

// Exporta a função query para uso em outros módulos
module.exports = { query };

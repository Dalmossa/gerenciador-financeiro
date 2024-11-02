// src/middlewares/errorHandler.js

/**
 * Middleware para tratamento de erros.
 * @param {Object} err - O objeto de erro.
 * @param {Object} req - O objeto da requisição.
 * @param {Object} res - O objeto da resposta.
 * @param {Function} next - Função para passar o controle para o próximo middleware.
 */
function errorHandler(err, req, res, next) {
    // Log do erro para debug
    console.error('Erro capturado:', err);

    // Definindo o status da resposta
    const statusCode = err.status || 500; // Usa o status do erro ou 500 se não estiver definido

    // Resposta ao cliente
    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Erro interno do servidor',
        // Aqui você pode adicionar mais informações se necessário, como stack trace em ambiente de desenvolvimento
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });

    // Nota: Não é necessário um bloco finally aqui, pois a resposta já foi enviada.
}

module.exports = errorHandler;

/*
    Como usar o módulo middleWare:
    para user este módulo em seu aplicativo Express, você deve importá-lo e registrá-lo após 
    todas as suas rotas,  geralmente no arquivo de configuração do aplicativo.
    Exemplo:
    const express = require('express');
    const errorHandler = require('./middlewares/errorHandler');
    const app = express();
    // configurações e middlewares ( ex.:  cors, body-parser, etc.)
    app.use(express.json());
    // Definição das rotas
    app.get('/', (req, res) => {
        res.send('Hello World!');
        });
    //  Registra o middleware de tratamento de erros
     app.get('/erro',  (req, res, next) => {
        throw new Error(' Este é um erro de teste!') //  Lança um erro para testar o middleware
        const err = new Error('Erro de exemplo');
        err.status = 400;
        next(err);
        });

        // Registra o middleware de tratamento de erros
        app.use(errorHandler);
        // Inicia o servidor
        app.listen(3000, () => {
            console.log('Servidor iniciado na porta 3000');
            });
            

 */
// src/app.js

// Importa o módulo express, que é um framework web para Node.js.
const express = require('express');
const bodyParser = require('body-parser');
// Importa o módulo de conexão com o banco de dados.
const db = require('./config/db');

// Cria uma instância do aplicativo Express.
const app = express();

// Middleware para analisar o corpo das requisições em formato JSON
app.use(express.json());
app.use(bodyParser.json());

// Define a porta em que o servidor irá escutar as requisições.
const PORT = process.env.PORT || 3000;

// Importa os roteadores definidos em outros arquivos
const usuarioRouter = require('./routes/usuarioRouter'); // Roteador de usuário
const categoriaRouter = require('./routes/categoriaRouter'); // Roteador de categoria
const tarefaRouter = require('./routes/tarefaRouter'); // Roteador de tarefa

// Monta os roteadores nas rotas apropriadas
app.use('/api/usuarios', usuarioRouter); // Prefixo para as rotas de usuário
app.use('/api/categorias', categoriaRouter); // Prefixo para as rotas de categoria
app.use('/api/tarefa', tarefaRouter); // Prefixo para as rotas de tarefa

// Verificar conexões ativas

/*
============================================================================================================================================================
 * Importar módulo /models/Usuario
 */
const { createTable } = require('./models/Usuario');

// Criar a tabela de usuários ao iniciar a aplicação
//createTable(); // Descomente esta linha se desejar criar a tabela ao iniciar

// Inicia o servidor e faz com que ele comece a escutar requisições na porta definida anteriormente......
const server = app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// Implementação do desligamento gracioso, para evitar desligamento incorreto além de portas ocupadas sem usos
process.on('SIGINT', () => {
    server.close(() => {
        console.log('Servidor fechado');
        process.exit(0);
    });
});

/*
Explicação do Código

1. **Middleware**: O middleware `express.json()` é utilizado para analisar o corpo das requisições em formato JSON, permitindo que você acesse `req.body` nas rotas.

2. **Rotas**: As rotas são importadas de outros arquivos (`usuarioRouter.js`, `categoriaRouter.js`, `tarefaRouter.js`) e são montadas nos caminhos apropriados. Isso ajuda a organizar melhor as rotas da sua aplicação.

3. **Tratamento de Erros**: O tratamento de erros é feito no nível das rotas (nos arquivos dos roteadores), garantindo que qualquer erro durante a consulta ao banco de dados seja tratado adequadamente.

4. **Desligamento Gracioso**: O evento `SIGINT` permite que o servidor feche todas as conexões ativas antes de encerrar o processo, evitando problemas como EADDRINUSE ao reiniciar o servidor.

Considerações Finais:
Colocar esse código garantirá que sua aplicação encerre corretamente suas operações e libere a porta que estava usando, evitando problemas futuros. Se precisar de mais ajuda ou tiver outras dúvidas, fique à vontade para perguntar!
*/
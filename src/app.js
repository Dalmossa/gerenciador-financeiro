// src/app.js

// Importa o módulo express, que é um framework web para Node.js.
const express = require('express');
const bodyParser = require('body-parser');

// Cria uma instância do aplicativo Express.
const app = express();

// Middleware para analisar o corpo das requisições em formato JSON
app.use(express.json());
app.use(bodyParser.json());

// Define a porta em que o servidor irá escutar as requisições.
const PORT = process.env.PORT || 3000;

// Importa os roteadores definidos em outros arquivos
const usuarioRouter = require('./routes/usuarioRouter'); // Roteador de usuário
const categoriaRouter = require('./routes/categoryRouter'); // Roteador de categoria
const taskRouter = require('./routes/taskRouter'); // Roteador de tarefa
const subcategoriasRouter = require('./routes/subcategoryRouter');

// Monta os roteadores nas rotas apropriadas
app.use('/api/usuarios', usuarioRouter); // Prefixo para as rotas de usuário
app.use('/api/categorias', categoriaRouter); // Prefixo para as rotas de categoria
app.use('/api/tarefa', taskRouter); // Prefixo para as rotas de tarefa
app.use('/api/subcategorias', subcategoriasRouter); // Prefixo para as rotas de subCategorias

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

module.exports = app;
// A falta de tempo ainda não me permitiu documentar  o código, mas se você precisar de ajuda, basta perguntar. Estou  aqui para ajudar. 
// Obrigado por ler até aqui. Boa sorte com o seu projeto.  -
// 

/*
Explicação do Código

1. **Middleware**: O middleware `express.json()` é utilizado para analisar o corpo das requisições em formato JSON, permitindo que você acesse `req.body` nas rotas.

2. **Rotas**: As rotas são importadas de outros arquivos (`usuarioRouter.js`, `categoriaRouter.js`, `tarefaRouter.js`) e são montadas nos caminhos apropriados. Isso ajuda a organizar melhor as rotas da sua aplicação.

3. **Tratamento de Erros**: O tratamento de erros é feito no nível das rotas (nos arquivos dos roteadores), garantindo que qualquer erro durante a consulta ao banco de dados seja tratado adequadamente.

4. **Desligamento Gracioso**: O evento `SIGINT` permite que o servidor feche todas as conexões ativas antes de encerrar o processo, evitando problemas como EADDRINUSE ao reiniciar o servidor.

Considerações Finais:
Colocar esse código garantirá que sua aplicação encerre corretamente suas operações e libere a porta que estava usando, evitando problemas futuros. Se precisar de mais ajuda ou tiver outras dúvidas, fique à vontade para perguntar!
*/
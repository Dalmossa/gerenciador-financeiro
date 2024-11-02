// /router/router.js

// Importa o módulo express
const express = require('express');

// Importar modulo de conexção com servidro mysql
const db = require('../services/server');
const query = db.query;

// Cria um roteador usando express.Router()
const router = express.Router();

/**
 * Middleware para registrar a hora da requisição
 */
router.use((req, res, next) => {
    console.log('Horário da requisição: ', new Date().toISOString());
    next(); // Passa para o próximo middleware ou rota
});

/*
*  Rota para buscar os dados da categorias que está armazenado no banco de dados.
*/ 

router.get('/', async (req, res) => {
    // Aqui você pode chamar uma função que busca os dados da categoria no banco de dados
    // e retorna os dados para a requisição.
   try {
    const result = await query('SELECT * FROM categorias');
    res.json(result);
    } catch (error) {
        console.error('Erro ao buscar dados  da categoria:', error); //  Loga o erro no console
        res.status(500).send('Erro interno ao  buscar dados da categoria'); // Envia um status 500 ao cliente
    }


   

});



/**
 * Rota GET para a homepage
 */
router.get('/', (req, res) => {
    res.send('Bem-vindo à homepage!');
});

/**
 * Rota GET para obter informações de um usuário específico
 * @param {string} id - ID do usuário
 */
router.get('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Simulação de busca de usuário (substituir pela lógica real)
        const usuario = await buscarUsuarioPorId(id); // Função fictícia
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.json(usuario);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

/**
 * Rota POST para criar um novo usuário
 */
router.post('/usuario', async (req, res) => {
    try {
        const novoUsuario = req.body; // Dados do novo usuário enviados no corpo da requisição
        // Simulação de criação de usuário (substituir pela lógica real)
        const usuarioCriado = await criarUsuario(novoUsuario); // Função fictícia
        res.status(201).json(usuarioCriado);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

// Função fictícia para simular busca de usuário por ID
async function buscarUsuarioPorId(id) {
    // Implementar lógica real de busca no banco de dados aqui
    return { id, nome: 'Usuário Exemplo' }; // Exemplo de retorno
}

// Função fictícia para simular criação de um novo usuário
async function criarUsuario(usuario) {
    // Implementar lógica real de criação no banco de dados aqui
    return { id: 1, ...usuario }; // Exemplo de retorno com ID gerado
}

// Exporta o roteador para ser usado em outros arquivos
module.exports = router;

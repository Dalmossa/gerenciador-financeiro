/*
Descrição desse Módulo
Este módulo middleWare é responsavél por verificar se o usuário está autenticado,
antes de permitir o  acesso a determinadas funcionalidades do sistema.
*/

// src/middlewares/authMiddleware.js

const { verifyToken } = require('../config/auth');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send('Token não fornecido.');
    }
    try {
        const decoded = verifyToken(token);
        req.userId = decoded.id; // Armazena o ID do usuário na requisição
        next();
    } catch (error) {
        return res.status(401).send('Token inválido.');
    }
};

module.exports = authMiddleware;



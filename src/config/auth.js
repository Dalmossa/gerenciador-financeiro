/*
Descrição desse Módulo
Este módulo é responsavél por configurar a autenticação, como a geração e verficicação de  tokens  de acesso JWT.

*/


// src/config/auth.js

const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
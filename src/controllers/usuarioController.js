// /controllers/usuarioControllers.js

// Importa o modelo Usuario para interações com o banco de dados
const Usuario = require('../models/Usuario');
const formatDateToMySQL = require('../models/module_format');

// Controlador para adicionar um novo usuário
async function createUser(req, res) {
    try {
        const { nome, email, senha, datacriacao } = req.body;
        
        

        // Validação basica, certifica se os campos foram criados
    /**
     * 
     *     if (!nome || !email || !senha || dataCriacao) {
            return res.status(400).json({ error: 'Nome, email  senha e, dataCriacao são obrigatórios:' });
        }
     */
        // Validação avançada, verifica qual, ou  quais campos foram criados
        if (!nome) {
            return res.status(400).json({ error: 'Nome é obrigatório.' });
    
        };
        if (!email) {
            return res.status(400).json({ error: 'Email é obrigatório.' });
        };
        if  (!senha) {
            return res.status(400).json({ error: 'Senha é obrigatório.' });
        };
        if (!datacriacao) {
            return res.status(400).json({ error: 'Data de criação é obrigatório.'});
        };


        // Cria o novo usuário
        const dateFormatted = formatDateToMySQL(datacriacao);
        const novoUsuario = await Usuario.createUser({ nome, email, senha, dateFormatted });
        res.status(201).json(novoUsuario);        
        console.log("Novo usuário criado", novoUsuario)
    } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
        res.status(500).json({ error: 'Erro ao adicionar usuário.' });
    }
}

// Controlador para obter todos os usuários
async function getAllUser(req, res) {
    try {
        const [ usuarios]   = await Usuario.getAllUser();
            if (usuarios.length > 0) {res.status(200).json(usuarios);} else {
                res.status(204).json({message: 'Nenhum usuário encontrado'})
            }
        
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
    
}

// Controlador para obter um usuário pelo ID
async function getUserById(req, res) {
    try {
        const { id } = req.params;
        const usuario  = await Usuario.getUserById(id);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }  else { 
        if (usuario.length > 0) {
            res.status(200).json(usuario); 
            console.log(`Usuário encontrado:  ${usuario}`)
        }           
          
         }        
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar usuário.' });
    }
}

// Controlador para atualizar um usuário pelo ID
async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { nome, email, senha } = req.body;

        // Verifica se o usuário existe
        const usuarioExistente = await Usuario.getUserById(id);
        if (!usuarioExistente) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        // Atualiza o usuário
        const usuarioAtualizado = await Usuario.updateUser(id, { nome, email, senha });
        res.status(200).json(usuarioAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ error: 'Erro ao atualizar usuário.' });
    }
}

// Controlador para excluir um usuário pelo ID
async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        // Verifica se o usuário existe
        const usuarioExistente = await Usuario.getUserById(id);
        if (!usuarioExistente) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        // Exclui o usuário
        await Usuario.deleteUser(id);
        res.status(204).send(); // Retorna sucesso sem conteúdo
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        res.status(500).json({ error: 'Erro ao excluir usuário.' });
    }
}

// Exporta os controladores para uso nas rotas
module.exports = {
    createUser,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser
};

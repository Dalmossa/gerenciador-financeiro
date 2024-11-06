// /controllesrs/taskController.js

// Importar o modulo que irá interar com o banco de dados
const  ModuloTask  = require('../models/task');


// Controlar a requisição que recebeu do /routes/tarefaRouter.js
async function createTask(req, res) {
    const { descricao, usuario_id, categoria_id } = req.body;
    try {

        // Validação dos campos, caso falte algum deles, a função é interrompida e dá um retorno ao usuário
        // dessa forma, evita o erro no servidor, negando a requisição com o código 400 
        if (!descricao) {
            return res.status(400).json({ error: 'Atenção, o campo descrição, é obrigatorio!' })
        }
        if (!usuario_id) {
            return res.status(400).json({ error: 'Atenção, o campo usuario_id, é obrigatorio!' })
        }
        if (!categoria_id) {
            return res.status(400).json({ error: 'Atenção, o campo categoria_id, é obrigatorio!' })
        }
        else {
            const taskId = await ModuloTask.createTask(descricao, usuario_id, categoria_id);
            res.status(201).json({ id: taskId });
        }

    } catch (error) {
        console.error('Erro ao criar a tarefa', error);
        res.status(500).json({ error: 'Atenção, erro ao criar tarefa' });

    }
};

// Função para pegar todas as tarefas
async function getAllTasks(req, res) {
    try {
        const AllTask = await ModuloTask.getAllTasks();
        res.status(200).json(AllTask);

    } catch (error) {
        console.error('Tarefas não encontradas');
        res.status(500).json({ Erro: ' Tarefas não encontradas' });
    }
};


async function getTaskById(req, res) {
    const { id } = req.params;
    try {
        const task = await ModuloTask.getTaskById(id);
        if (!task) {
            return res.status(404).json({ Erro: 'Tarefa não encontrada' })
        }        
                console.log('Tarefa encontrada')
                return res.status(200).json(task);     
            
        
    } catch (error) {
        console.error('Tarefa não encontrada');
        res.status(404).json({ message: 'Tarefa não encontrada' });
    }
}

async function updateTask(req, res) {
    const { id } =  req.params;
    const { descricao, status, prioridade } = req.body;
    
    try {

        const task = await ModuloTask.getTaskById(id);
        if (!task) {
            console.log('Tarefa não encontrada')
            return res.status(404).json({message: 'Tarefa não encontrada'});
       }
        const dataUpdate = await ModuloTask.updateTask(id, descricao, status, prioridade);
        console.log('Tarefa atualizada com sucesso:', dataUpdate)
        res.status(200).json( dataUpdate );
       

    } catch (error) {
        console.error('Erro ao atualizar tarefa')
        res.status(500).json({ message: 'Erro ao atualizar tarefa ' });
    }
};

async function deleteTask(req, res) {
    const { id } =  req.params;
    
    try {
        const task = await ModuloTask.getTaskById(id);
        if (!task) {
          console.log('Tarefa não encontrada');
         return res.status(404).json({message: 'Tarefa não encontrada'});
        } 
            await ModuloTask.deleteTask(id);
            console.log('Tarefa deletada com sucesso', task)
            res.status(204).json(task)
        
    } catch (error) {
        console.error('Erro ao deletar tarefa', error)
        res.status(500).json({ message: 'Erro ao deletar tarefa' })
    }
}


module.exports = { 
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask 
} 



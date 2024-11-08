// Este modulo tem a resposabilidade de controlar as requisições do cliente, tratá-las e enviar ao modulo "/models/Subcategory" 
// o qual irá tratar as interações com o banco de dados.
const  { createSubcategory,
         getAllSubcategory,
          getSubcategoryById,
          updateSubcategory,
           deleteSubcategory }  = require('../models/SubCategory');
           // Exporta a função que lida com a requisição para criar uma nova subcategoria
           exports.createSubcategory = async (req, res) => {
               const { nome, categoriaid } = req.body 
               
               
               console.log('Dados recebidos da requisição:', {Subcategoria: req.body  }); // Log dos dados recebidos na requisição
           
               try {
                                   
                   // Verifica se o nome e o id estão presentes
                   if (!nome || !categoriaid) {
                       console.error('Erro: Nome e Id são obrigatórios na requisição');
                       return res.status(400).json({ message: 'Nome e Id são obrigatórios' });
                   }
                   // Verifica se categoriasid é um número valido
                   if (isNaN(categoriaid)) {
                    console.log('Erro: Categoria ID deve ser um número válido');
                    return res.status(400).json({message: 'Categoria ID deve ser um número válido'})
                   }
                   // Remove espaço em branco no início e fim do nome
                   const trimmedNome = nome.trim();

                   // Se o nome estiver vazio após o trim, retornar erro
                   if (!trimmedNome) {
                    console.log('Erro: Nome não pode ser vazio');
                    return res.status(400).json({message: 'Nome não pode ser vazio'})
                   }

                   // Chama a função para criar a subcategoria
                   const subcategoryId = await createSubcategory(trimmedNome, categoriaid); // Chama a função para criar a subcategoria
                   console.log(`Subcategoria criada com sucesso. ID: ${subcategoryId}`);

                   // Enviar a resposta com status 201 e o id da nova subcategoria
                    res.status(201).json({ id: subcategoryId, nome: trimmedNome });
               
               } catch (error) {
                   console.error('Erro ao tentar inserir nova categoria:', error);
                   res.status(500).json({ message: 'Erro ao tentar Inserir nova categoria' });
               }
           };
           
           // Função para buscar todas as subcategorias
           exports.getAllSubcategory = async (req, res) => {
               try {
                   const subcategory = await getAllSubcategory(); // Chama a função para buscar as subcategorias
                   console.log('Subcategorias encontradas:', subcategory); // Log das subcategorias encontradas
                   res.json(subcategory);
               } catch (error) {
                   console.error('Erro ao buscar Subcategorias:', error);
                   res.status(404).json({ message: 'Erro ao buscar Subcategorias' });
               } 
           };

exports.getSubcategoryById = async (req, res) => {
    const { id } = req.params;

    try {
        const subcategory = await getSubcategoryById(id);
        if (!subcategory) {
            return res.status(404).json({message: 'Subcategoria não encontrada com id', id });
        }
        res.json(subcategory);

    } catch (error) {
        console.error('Erro ao buscar Subcategoria', error);
        res.status(500).json({message: 'Erro ao busacar Subcategoria'});
    }
   
};


// Atualizar subcategoria
exports.updateSubcategory = async (req, res) => {
    const { id } = req.params;
    const { nome, categoriaid } = req.body;

    try {
        // Chama a função de atualização
        const result = await updateSubcategory(id, nome, categoriaid);
        res.status(200).json({ message: 'Subcategoria atualizada com sucesso', result });
    } catch (error) {
        console.error('Erro ao atualizar subcategoria:', error);
        res.status(500).json({ message: 'Erro ao atualizar subcategoria', error: error.message });
    }
};




exports.deleteSubcategory = async (req, res) => {
    const { id } = req.params;   

    try {
        const dbDelete = await getSubcategoryById(id);
        if (!dbDelete) {
            console.log('Dados não encontrado, não é possível excluir')
            return res.status(404).json({'Subcategoria não encontrada, não é possível excluir': id});
        }
        await deleteSubcategory(id);

    } catch (error) {
        console.error('Erro ao tentar exluir');
        res.status(500).json({message: 'Erro ao tentar exluir'})

    } 

};
const  { createSubcategory }  = require('../models/SubCategory');

exports.createSubcategory = async (req, res) => {
    try {
        const { nome, categoriaId } = req.body;
        if (!nome || !categoriaId) {
            console.log('Nome e categoriaId são obrigatórios');
            return res.status(400).json({ message: 'Nome e categoriaId são obrigatórios.' });
        }
        
        const subcategoryId = await createSubcategory(nome, categoriaId);
        res.status(201).json({ id: subcategoryId, nome });
    
    } catch (error) {
            if (error instanceof SomeSpecificError) {
                res.status(400).json({ message: 'Erro específico: ' + error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor.' });
            }
        }
        
};

exports.getAllSubcategory = async (res, req) => {

};


exports.getSubcategoryById = async (res, req) => {

}


exports.updateSubcategory = async (res, req) => {

}

exports.deleteSubcategory = async (res, req) => {

}


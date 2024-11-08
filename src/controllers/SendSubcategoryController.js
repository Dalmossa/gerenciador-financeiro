const axios = require('axios');

const categorias = [
    {
        nome: 'Moradia',
        subcategorias: ['Aluguel', 'Hipoteca', 'Contas de água, luz e gás', 'Condomínio']
    },
    {
        nome: 'Alimentação',
        subcategorias: ['Supermercado', 'Restaurantes', 'Delivery de comida']
    },
    {
        nome: 'Transporte',
        subcategorias: ['Gasolina/Combustível', 'Transporte público', 'Uber/Táxi']
    },
    {
        nome: 'Saúde',
        subcategorias: ['Consultas médicas', 'Medicamentos', 'Seguro saúde']
    },
    {
        nome: 'Educação',
        subcategorias: ['Mensalidades escolares', 'Livros e materiais didáticos', 'Cursos extras']
    },
    {
        nome: 'Lazer',
        subcategorias: ['Cinema', 'Viagens', 'Assinaturas de streaming']
    },
    {
        nome: 'Vestuário',
        subcategorias: ['Roupas', 'Calçados', 'Acessórios']
    },
    {
        nome: 'Economias e investimentos',
        subcategorias: ['Poupança', 'Investimentos em ações', 'Fundos de investimento']
    }
];

async function getCategoryByName(nome) {
    try {
        console.log(`Buscando categoria pelo nome: ${nome}`);
        const response = await axios.get('http://localhost:3000/api/categorias');
        
        // Imprimir os dados que foram retornados da consulta
        console.log('Dados retornados da API:', response.data);
        
        const lista = response.data;
        
        // Verifica se a lista é um array e imprime seu comprimento
        if (Array.isArray(lista)) {
            console.log(`Número de categorias encontradas: ${lista.length}`);
        } else {
            console.error('A resposta não é um array:', lista);
            return null;
        }

        // Tenta encontrar a categoria pelo nome
        const categoria = lista.find(item => item.nome === nome);
        
        // Log da categoria encontrada
        if (categoria) {
            console.log(`Categoria encontrada: ${JSON.stringify(categoria)}`);
            console.log(`ID encontrado para "${nome}": ${categoria.id}`);
            return categoria.id; // Retorna o ID da categoria
        } else {
            console.warn(`Categoria não encontrada para o nome: "${nome}"`);
            return null; // Retorna null se não encontrar a categoria
        }
        
    } catch (error) {
        console.error('Erro ao buscar categoria:', error);
        return null;  // Retorna null caso a requisição falhe
    }
}

// Função para inserir dados
async function insertData() {
    try {
        // Inserir categorias
        for (const categoria of categorias) {
            console.log(`Inserindo categoria: ${categoria.nome}`);
            const response = await axios.post('http://localhost:3000/api/categorias', { nome: categoria.nome });
            console.log(`Categoria '${categoria.nome}' inserida com sucesso!`);

            // Inserir subcategorias
            console.log(`Iterando sobre subcategorias de '${categoria.nome}'`);
            for (const subcategoria of categoria.subcategorias) {
                const id = await getCategoryByName(categoria.nome);
                
                // Verifica se o ID foi encontrado
                if (id !== null) {
                    console.log(`ID encontrado para '${subcategoria}': ${id}`);
                    
                    // Alterando para enviar 'categoriaid' em vez de 'id'
                    await axios.post('http://localhost:3000/api/subcategorias', { 
                        categoriaid: id, // Corrigido para 'categoriaid'
                        nome: subcategoria  
                    });
                    console.log(`Subcategoria '${subcategoria}' inserida com sucesso!`);
                } else {
                    console.error(`ID não encontrado para a categoria '${categoria.nome}'. Subcategoria '${subcategoria}' não será inserida.`);
                }
            }
        }
        
    } catch (error) {
        console.error('Erro ao inserir dados:', error);
    }
}

// Chamada para inserir dados
insertData();

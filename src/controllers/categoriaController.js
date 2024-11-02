
export async function getCategorias() {
    const pool = await createPool();
    
    try {
        // Consulta para buscar todas as categorias
        const [rows] = await pool.query('SELECT * FROM categorias');
        
        // Exibe as categorias no console
        console.log('Categorias atuais no banco de dados:', rows);
        
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
    } finally {
        await pool.end(); // Fecha o pool de conexões
    }
}


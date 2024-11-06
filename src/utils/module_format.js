/**
 * Formata uma data recebida em diferentes formatos para o formato MySQL (YYYY-MM-DD).
 * @param {string} inputDate - A data a ser formatada, recebida do frontend.
 * @returns {string} - A data formatada no padrão MySQL.
 * @throws {Error} - Lança um erro se a data não puder ser convertida.
 */
function formatDateToMySQL(inputDate) {
    let formattedDate;
   

    try {
        // Tenta criar um objeto Date a partir da string recebida
        const date = new Date(inputDate);

        // Verifica se a data é válida
        if (isNaN(date.getTime())) {
            throw new Error('Data inválida fornecida.');
        }

        // Formata a data para o padrão YYYY-MM-DD
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
        const day = String(date.getDate()).padStart(2, '0');

        formattedDate = `${year}-${month}-${day}`;
    } catch (error) {
        console.log('Data recebida na formatação:',inputDate);
        console.error('Erro ao formatar a data:', error);
        throw error; // Re-lança o erro para tratamento posterior
    } finally {
        // Aqui você pode adicionar qualquer lógica que precise ser executada independentemente do resultado
        console.log('Tentativa de formatação de data concluída.');
    }

    return formattedDate;
}
 
module.exports = formatDateToMySQL;
// Exemplo de uso da função

/**
 * try {
    const dateFromFrontend = '27/09/2024'; // Data recebida do frontend
    const mysqlFormattedDate = formatDateToMySQL(dateFromFrontend);
    console.log('Data formatada para MySQL:', mysqlFormattedDate);
} catch (error) {
    console.error('Falha ao formatar a data:', error.message);
};
 */

/*

Explicação do Código
Parâmetros :
A função recebe um parâmetro , que é uma string dos dados recebidos do frontend.formatDateToMySQLinputDate
Tratamento de Erros :
O bloco tenta criar um objeto a partir da string fornecida. Se a conversão falhar (ou seja, se o dado não for válido),
 um erro é lançado.tryDate
O bloco de erros de captura e os loga no console, além de relança-los para que possam ser tratados em outro lugar no
 código.catch
Formatação de Dados :
Os dados são formatados no padrão AAAA-MM-DD, que é o formato aceito pelo MySQL. O mês é ajustado, pois o método
 retorna meses de 0 a 11.getMonth()
Bloco finally :
O bloco é executado independentemente de ocorrer um erro ou não. Isso pode ser útil para registrar informações ou
 realizar ações que devem sempre acontecer após uma tentativa de formatação.finally
Exemplo de uso :
Um exemplo de uso da função é fornecido, onde uma data fictícia foi passada e o resultado é exibido no console.
Melhores Práticas
Validação e Sanitização : Sempre valide e higienize os dados recebidos do frontend antes de processá-los.
Tratamento de Erros : Use o tratamento adequado de erros para garantir que seu aplicativo possa lidar com entradas 
inesperadas sem falhar completamente.
Documentação : Comente seu código e documente as funções para facilitar a manutenção futura.
Testes : Considere escrever testes automatizados para garantir que sua função seja compatível com o esperado com
diferentes formatos de entrada.
Com essa estrutura, sua função estará pronta para ser utilizada em qualquer parte do seu projeto onde você precise 
formatar dados para compatibilidade com o MySQL.
*/
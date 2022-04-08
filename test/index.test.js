const pegaArquivo = require('../index');

const arrayResult = [
    {
        FileList: 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList'
    }
]

describe('pegaArquivo::', () => {
    it('deve ser uma função', () => {
        expect(typeof pegaArquivo).toBe('function');
    })
    it('deve retornar um array com resultados', async () => {
        const resultado = await pegaArquivo('C:/Users/Lenovo470/alura/node/test/arquivos/texto1.md')
        expect(resultado).toEqual(arrayResult);
    })
    it('deve retornar mensagem "Não há links no arquivo"', async () => {
        const resultado = await pegaArquivo('C:/Users/Lenovo470/alura/node/test/arquivos/texto1_semlinks.md')
        expect(resultado).toBe('Não há links no arquivo');
    })
    it('deve lançar um erro na falta de arquivo', async () => {
        await expect(pegaArquivo('C:/Users/Lenovo470/alura/node/test/arquivos'))
            .rejects.toThrow('Não há arquivo neste caminho')
    })
    it('deve resolver a função com sucesso', async () => {
        await expect(pegaArquivo('C:/Users/Lenovo470/alura/node/test/arquivos/texto1.md')).resolves.toEqual(arrayResult)
    })
})
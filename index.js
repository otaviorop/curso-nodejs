const chalk = require('chalk');
const fs = require('fs');


function extrairTexto(texto) {
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
    const arrayResultado = [];
    let temp;
    while ((temp = regex.exec(texto)) !== null) {
        arrayResultado.push({ [temp[1]]: temp[2] });
    }
    return arrayResultado.length === 0 ? 'Não há links no arquivo' : arrayResultado;
}

function trataErro(err) {
    throw new Error(chalk.red(err.code, 'Não há arquivo neste caminho'))
}

async function pegaArquivo(caminho) {
    try {
        const texto = await fs.promises.readFile(caminho, 'utf-8');
        return extrairTexto(texto);
    } catch (err) {
        trataErro(err);
    }
}

module.exports = pegaArquivo;


const fetch = require('node-fetch');

function manejaErros(err) {
    throw new Error(err.message);
}

async function checaStatus(arrayURLs) {
    try {
        const arrayStatus = await Promise
            .all(arrayURLs.map(async url => {
                const res = await fetch(url)
                return res.status;
            }));
        return arrayStatus;
    } catch (err) {
        manejaErros(err);
    }
}

function geraArrayDeUrls(arrayLinks) {
    return arrayLinks.map(objetoLink => Object.values(objetoLink).join());
}


async function validaUrl(arrayLinks) {
    const links = geraArrayDeUrls(arrayLinks);
    const statusLinks = await checaStatus(links);
    const resultados = arrayLinks.map((objeto, index) =>
    ({
        ...objeto,
        status: statusLinks[index]
    }));
    return resultados;
}


module.exports = validaUrl;
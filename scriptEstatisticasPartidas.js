const axios = require('axios');
const fs = require('fs');

function getDataFromJSON() {
    let rawdata = fs.readFileSync('../Partidas.json');
    let jsonData = JSON.parse(rawdata);
    fixturesId = jsonData.fixtures.map((partida) => {
        return partida["fixture_id"]
    })

    // let unique = [...new Set(playersId)];

    return fixturesId;
}

async function appendJson(jsonString, fixtureId) {
    await fs.appendFile('../EstatisticasPartidas.json', `{"fixture_id": ${fixtureId}, "statistics": ${jsonString}},`, err => {
        if (err) {
            console.log('Error writing file', err);
        } else {
            console.log('Successfully wrote file', fixtureId);
        }
    })
}

let partidasId = getDataFromJSON()
// let partidasId = [35476, 35475, 35474, 35469]
// jogadoresId = [114679, 77739, 77965, 157605]
console.log(partidasId, partidasId.length)

// const ligas = [41, 6, 357];

let partidaAtual = partidasId[0]



const options = {
    method: 'GET',
    url: `https://api-football-v1.p.rapidapi.com/v2/statistics/fixture/${partidaAtual}`,
    headers: {
        'x-rapidapi-key': 'YOURKEY', // CHANGE TO YOUR KEY
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
};

function getLineupsFromApi() {
    partidasId.map(async (valor, index) => {
        options.url = `https://api-football-v1.p.rapidapi.com/v2/statistics/fixture/${valor}`;
        console.log(options.url, index)

        const jsonString = await axios.request(options).then(function (response) {
            return JSON.stringify(response.data.api.statistics)
        }).catch(error => {
            console.log(error.response)
        })

        await appendJson(jsonString, valor);
    })
}

// getLineupsFromApi()

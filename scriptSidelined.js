const axios = require('axios');
const { TIMEOUT } = require('dns');
const fs = require('fs');

function getDataFromJSON() {
    let rawdata = fs.readFileSync('../Jogadores.json');
    let jsonData = JSON.parse(rawdata);
    console.log(jsonData.players.length)
    playersId = jsonData.players.map((jogador) => {
        return jogador["player_id"]
    })

    let unique = [...new Set(playersId)];

    return unique;
}

async function appendJson(jsonString, playerId) {
    await fs.appendFileSync('../SidelinedJogadores.json', `{"player_id": ${playerId}, "sidelined": ${jsonString}},`, err => {
        if (err) {
            console.log('Error writing file', err);
        } else {
            console.log('Successfully wrote file', playerId);
        }
    })
}

/* let jogadoresId = getDataFromJSON()
// jogadoresId = [114679, 77739, 77965, 157605]
jogadoresId.sort((a, b) => a - b)
console.log(jogadoresId, jogadoresId.length)
let primeiraParte = jogadoresId.slice(0, (jogadoresId.length) / 2);
let segundaParte = jogadoresId.slice(jogadoresId.length / 2, jogadoresId.length)
console.log(primeiraParte.length, segundaParte.length) */
// const ligas = [41, 6, 357];
let sidelinedsComErro = getUndefined()
console.log(sidelinedsComErro, sidelinedsComErro.length)
let jogadorAtual = sidelinedsComErro[0]



const options = {
    method: 'GET',
    url: `https://api-football-v1.p.rapidapi.com/v2/sidelined/player/${jogadorAtual}`,
    headers: {
        'x-rapidapi-key': 'YOURKEY', // CHANGE TO YOUR KEY
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
};

function getSidelinedFromApi() {
    sidelinedsComErro.map(async (valor, index) => {
        options.url = `https://api-football-v1.p.rapidapi.com/v2/sidelined/player/${valor}`;
        console.log(options.url, index)

        const jsonString = await axios.request(options).then(function (response) {
            return JSON.stringify(response.data.api.sidelined)
        }).catch(error => {
            console.log(error.response)
        })
        // console.log(`"player_id": ${valor}`, jsonString)
        await appendJson(jsonString, valor);
    })
}

function getUndefined() {
    let rawdata = fs.readFileSync('../SidelinedJogadores.json');
    let jsonData = JSON.parse(rawdata);
    let idsComErro = []
    jsonData.sidelined.map((item) => {
        if (item.sidelined === "undefined") {
            idsComErro.push(item["player_id"])
        }
    })

    return idsComErro

    // return undefinedId;
    // console.log(undefinedId)
}



// getSidelinedFromApi()

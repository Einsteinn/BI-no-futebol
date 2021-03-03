const axios = require('axios');
const fs = require('fs');

function getDataFromJSON() {
    let rawdata = fs.readFileSync('../Times.json');
    let jsonData = JSON.parse(rawdata);
    let times2017 = jsonData["Times 2017"].map((time) => {
        return time.team_id;
    })

    let times2018 = jsonData["Times 2018"].map((time) => {
        return time.team_id;
    })

    let times2019 = jsonData["Times 2019"].map((time) => {
        return time.team_id;
    })

    let timesId = times2017.concat(times2018, times2019);


    let unique = [...new Set(timesId)];

    return unique;
}

async function appendJson(jsonString) {
    fs.appendFile('../Jogadores.json', `${jsonString},`, err => {
        if (err) {
            console.log('Error writing file', err);
        } else {
            console.log('Successfully wrote file');
        }
    })
}

let timesId = getDataFromJSON()
console.log(timesId, timesId.length)

// const ligas = [41, 6, 357];

let timeAtual = timesId[0]

const options = {
    method: 'GET',
    url: `https://api-football-v1.p.rapidapi.com/v2/trophies/player/{jogadorAtual}`,
    headers: {
        'x-rapidapi-key': 'YOURKEY', // CHANGE TO YOUR KEY
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
};

function contarJogadores() {
    let rawdata = fs.readFileSync('../Jogadores.json');
    let jsonData = JSON.parse(rawdata);
    console.log(jsonData.players.length)
    playersId = jsonData.players.map((jogador) => {
        return jogador["player_id"]
    })
    let unique = [...new Set(playersId)];
    console.log(unique.length)

}

function contarPartidas() {
    let rawdata = fs.readFileSync('../Partidas.json');
    let jsonData = JSON.parse(rawdata);
    console.log(jsonData.fixtures.length, "PARTIDAS")
}

function contarTitulosJogadores() {
    let rawdata = fs.readFileSync('../TitulosJogadores.json');
    let jsonData = JSON.parse(rawdata);
    console.log(jsonData.trophies.length, "TITULOS JOGADORES")
}

function contarLineups() {
    let rawdata = fs.readFileSync('../Lineups.json');
    let jsonData = JSON.parse(rawdata);
    console.log(jsonData.lineups.length, "LINEUPS")
}

function contarEstatisticasPartidas() {
    let rawdata = fs.readFileSync('../EstatisticasPartidas.json');
    let jsonData = JSON.parse(rawdata);
    console.log(jsonData.estatisticas.length, "ESTATISTICAS PARTIDAS")
}

function contarEventosPartidas() {
    let rawdata = fs.readFileSync('../EventosPartidas.json');
    let jsonData = JSON.parse(rawdata);
    console.log(jsonData.eventos.length, "ESTATISTICAS PARTIDAS")
}

function contarPredictions() {
    let rawdata = fs.readFileSync('../Predictions.json');
    let jsonData = JSON.parse(rawdata);
    console.log(jsonData.predictions.length, "PREDICTIONS")
}

function contarSidelined() {
    let rawdata = fs.readFileSync('../SidelinedJogadores.json');
    let jsonData = JSON.parse(rawdata);
    console.log(jsonData.sidelined.length, "SIDELINED")
}



// contarPartidas()
// contarJogadores()
// contarTitulosJogadores()
// contarLineups()
// contarEstatisticasPartidas()
// contarEventosPartidas()
// contarPredictions()
contarSidelined()


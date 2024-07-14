const express = require('express');
const bodyParser = require('body-parser');
const scrapperService = require('./src/services/scrapper.service.js');
const databaseClient = require('./src/database/db.js');


const app = express();
const port = 3000;


databaseClient.buildDatabase();
databaseClient.populateDatabase();

function removeNonPrintableChars(str) {
    // Retirer les caractères non imprimables (\n, \r, \t, etc.)
    return str.replace(/[\n\r\t\f\v]/g, '');
}



function parseStringToInt(str) {
    try {
        const parsedInt = parseInt(str, 10);  // Le deuxième argument '10' spécifie la base 10
        if (isNaN(parsedInt)) {
            throw new Error(`Cannot parse '${str}' to an integer`);
        }
        return parsedInt;
    }
    catch (error) {
        return -1;
    }


}


// Middleware pour parser le JSON dans le corps des requêtes
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Replace * with specific origins if needed
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Endpoint pour /api/check
app.post('/api/check', async (req, res) => {
    const { host } = req.body;

    const scoreFromDb = await databaseClient.getScoreByUrl(host);
    console.log('--------- scoreFromDb', scoreFromDb);

    if (scoreFromDb) {
        return res.json({ score: scoreFromDb.score });
    }
    console.log('host', host);
    if (!host) {
        return res.status(400).json({ error: 'Host is required' });
    }

    // Logique pour déterminer le score de l'URL
    let score = -1;


    scrapperService.scapperEngine(host)
        .then(async (result) => {
            console.log('result', result);
            const scoreAsText = removeNonPrintableChars(result.score);
            const scoreAsInt = parseStringToInt(scoreAsText);
            console.log('formattedresult', scoreAsInt);
            await databaseClient.insertUrlAndScore(host, scoreAsInt);

            return res.json({ score: scoreAsInt });
        })
        .catch((error) => {
            console.log('error', error);
            return res.json({ score });
        });


});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

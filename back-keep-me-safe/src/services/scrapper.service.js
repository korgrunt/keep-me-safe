
const timeUtils = require('./../utils/time.utils.js');
const strUtils = require('./../utils/str.utils.js');
const debug = require('./../utils/debug.utils.js');
const randomUtils = require('./../utils/random.utils.js');
const behaviorUtils = require('./../utils/behavior.utils.js');
const browserService = require('./../services/browser.service.js')
const Tesseract = require('tesseract.js');
const fs = require('fs');
const path = require('path');


const execTargetScrapping = async (target, email) => {
    return new Promise((resolve) => {
        try {
            setTimeout(() => {
                return resolve(false)

            }, 3000)

        } catch (error) {
            return resolve(false)
        }

    });
}

async function recognizeImage(imagePath) {
    try {
        const worker = createWorker();
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize(imagePath);
        await worker.terminate();
        return text;
    } catch (error) {
        throw error;
    }
}

const startRandomMouseMove = (page) => {
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const moveMouse = async () => {
        const x = getRandomInt(0, page.viewport().width);
        const y = getRandomInt(0, page.viewport().height);
        await page.mouse.move(x, y);
    };

    const mouseInterval = setInterval(async () => {
        console.log("ok random MOUSE")
        await moveMouse();
    }, getRandomInt(500, 1500));

    // Arrêter le mouvement de la souris après un certain temps pour éviter les boucles infinies
    setTimeout(() => clearInterval(mouseInterval), 60000);
};

const scrollToXPath = async (page, xpath) => {
    const element = await page.$x(xpath);
    if (element.length > 0) {
        await page.evaluate((element) => {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, element[0]);
    } else {
        console.log('Élément non trouvé pour le XPath:', xpath);
    }
};

function extractDomain(url) {
    try {
        console.log("extractDomain");

        // Créer un objet URL si ce n'est pas déjà une URL
        let urlObj;
        if (!url.includes("://")) {
            urlObj = new URL("http://" + url);
        } else {
            urlObj = new URL(url);
        }

        // Récupérer le hostname
        let hostname = urlObj.hostname;

        // Si le hostname commence par "www.", le supprimer
        if (hostname.startsWith("www.")) {
            hostname = hostname.slice(4);
        }

        // Diviser le hostname en parties séparées par des points
        let parts = hostname.split('.');

        // Si le hostname a plus de deux parties (ex: subdomain.domain.com)
        if (parts.length > 2) {
            // Garder uniquement les deux dernières parties (ex: domain.com)
            hostname = parts.slice(-2).join('.');
        }

        // Vérifier que le domaine extrait suit le format "anything.anything"
        const domainPattern = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
        if (!domainPattern.test(hostname)) {
            throw new Error("Le domaine extrait n'est pas valide : " + hostname);
        }

        console.log("extractDomain is " + hostname);
        return hostname;
    } catch (error) {
        console.log("Error extracting domain:", error);
        return null;
    }
}
function imageToText(imagePath) {
    return new Promise((resolve, reject) => {
        Tesseract.recognize(
            // this first argument is for the location of an image it can be a //url like below or you can set a local path in your computer
            './area-screenshot.png',
            // this second argument is for the laguage 
            'eng'
            /*,{ logger: m => console.log(m) }*/
        ).then(({ data: { text } }) => {
            console.log("score is " + text);
            return resolve(text);
        })
    });
}




const scrappeTarget = async (url) => {
    return new Promise(async (resolve) => {
        try {

            const sanitizedUrl = extractDomain(url);
            console.log(`\n Currenlty search for a ${url}`)
            console.log(`\n Currenlty ssanitizedUrl earch for a ${sanitizedUrl}`)
            const targetUrl = `https://www.virustotal.com/gui/domain/${sanitizedUrl}`;

            // Launch the browser and open a new blank page
            const { browser, page } = await browserService.getBrowserAndPage();

            await page.goto(targetUrl);
            await page.waitForSelector('body', { visible: true });
            console.log("go to url")

            await page.setViewport({ width: 1920, height: 1080 });

            // 361 162
            // 401 198
            // Define the coordinates and dimensions of the area to capture
            const x = 360;  // X coordinate of the top-left corner
            const y = 160;  // Y coordinate of the top-left corner
            const width = 52;  // Width of the area to capture
            const height = 46;  // Height of the area to capture

            const imagePath = 'area-screenshot.png';
            // Capture screenshot of the specified area
            const screenshot = await page.screenshot({
                clip: { x, y, width, height },
                path: imagePath
            });

            console.log('Screenshot taken!');
            const scoreIs = await imageToText(imagePath)

            console.log(`scoreIs = ${scoreIs}`)

            if (page) {
                await page.close();
            }
            if (browser) {
                await browser.close();
            }

            return resolve({ score: scoreIs });
        } catch (error) {
            return resolve(false);
        }
    });
}



const scapperEngine = (url) => {
    return new Promise(async (resolve) => {
        const resultUrlScan = await scrappeTarget(url)
        console.log("resultUrlScan")
        console.log(resultUrlScan)
        return resolve(resultUrlScan);
    });
}

module.exports = {
    scapperEngine
}
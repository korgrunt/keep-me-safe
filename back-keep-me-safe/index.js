const uiUtils = require('./src/utils/ui.utils.js');
const uiService = require('./src/services/ui.service.js');
const scrapperService = require('./src/services/scrapper.service.js');
const strUtils = require('./src/utils/str.utils.js');
const debug = require('./src/utils/debug.utils.js');
const targets = require('./targets.js');

async function main() {

    await scrapperService.scapperEngine("gouv-url.com");

}

main();

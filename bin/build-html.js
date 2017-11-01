const nunjucks = require('nunjucks');
const fse = require('fs-extra');
const path = require('path');
const mkdirp = require('mkdirp');
const webpackMerge = require('webpack-merge');
const chokidar = require('chokidar');
const log = require('./log');

const assetsFile = 'assets.json';
const files = fse.readdirSync('src/templates/pages');

const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(['src/templates/layouts', 'src/templates/pages'], {
    noCache: true,
}));

const getDataFile = (fileName) => {
    const dataFile = fileName.replace('.njk', '.json');
    const dataFilePath = `src/templates/data/${dataFile}`;
    const assetsFilePath = `src/templates/data/${assetsFile}`;
    let data = {};
    let assetsData = {};
    // need to clear the require cache to get current data
    if (fse.existsSync(dataFilePath)) {
        delete require.cache[require.resolve(`../${dataFilePath}`)];
        data = require(`../${dataFilePath}`);
    }
    if (fse.existsSync(assetsFilePath)) {
        delete require.cache[require.resolve(`../${assetsFilePath}`)];
        assetsData = require(`../${assetsFilePath}`);
    }
    return webpackMerge(data, assetsData);
};

function watchHtml() {
    return new Promise((resolve, reject) => {
        log('notice', 'Start watching html templates...');
        const watcher = chokidar.watch('src/templates');
        watcher.on('change', (filepath) => {
            log('success', `${filepath} was updated.`);
            const fileName = path.basename(filepath);
            buildHtml(fileName, true);
        });
        return resolve();
    });
}

async function buildHtml(fileName, writeFiles) {
    return new Promise((resolve, reject) => {
        const data = getDataFile(fileName);
        const html = env.render(fileName, data);
        if (!writeFiles) {
            return resolve([fileName, html]);
        }
        fse.writeFile(`dist/${fileName.replace('njk', 'html')}`, html, (err) => {
            if (err) {
                log('error', `${fileName} file was not saved`);
                return reject(err);
            }
            log('success', `${fileName} saved`);
            return resolve();
        });
    });
}

async function startHtml(options = []) {
    log('processing', 'Rendering HTML files');
    const writeFiles = options.includes('--writeHtml') || options.includes('--prod');
    await mkdirp('./dist', (err) => {
        if (err) {
            log('error', err);
        }
    });
    let promises = files.map((fileName) => {
        return buildHtml(fileName, writeFiles);
    });
    try {
        // await watchHtml();
    } catch(err) {
        log('error', `An error with watchHtml: ${err}`);
    }
    return Promise.all(promises);
}

module.exports = {
    default: startHtml,
    getDataFile: getDataFile,
};

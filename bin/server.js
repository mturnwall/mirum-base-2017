const nunjucks = require('nunjucks');
const express = require('express');
const browsersync = require('browser-sync');
const webpack = require('webpack');
const webpackMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require('webpack-hot-middleware');
const getDataFile = require('./build-html').getDataFile;
const run = require('./run');
const log = require('./log');
const fse = require('fs-extra');
const opn = require('opn');
const buildCss = require('./build-css').default;

const env = (process.argv.includes('--prod')) ? 'prod' : 'dev';
const config = require('../webpack_' + env + '.config.js')({ env: env });
const compiler = webpack(config);

const host = 'localhost';
const port = '3000';
const app = express();

const htmlEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader(['src/templates/layouts', 'src/templates/pages'], {
    noCache: true,
    watch: true,
}));
htmlEnv.express(app);

function bs() {
    const bs = browsersync.create();
    bs.init({
        files: ['src/templates/**/*', 'dist/css/*.css'],
        proxy: `${host}:${port}`,
        logLevel: 'info',
        open: false,
    }, (err, api) => {
        log('success', `Server and browsersync started...`);
        opn(`${api.options.get('urls').get('local')}/index.html`)
            .then(() => {
                log('success', `Opening server at ${api.options.get('urls').get('local')}/index.html`);
            });
    });
}

async function startServer(options = []) {
    log('notice', 'Start server...');
    const watch = options.includes('--watch');
    let files = null;
    try {
        files = await fse.readdir('src/templates/pages');
        await buildCss(options);
    } catch(err) {
        log('error', err);
    }
    return new Promise((resolve, reject) => {
        if (files) {
            files.forEach(fileName => {
                app.get(`/${fileName.replace('njk', 'html')}`, function(req, res) {
                    const data = getDataFile(fileName);
                    return res.render(fileName, data);
                });
            });
            app.use(express.static('dist'));
            if (env === 'dev') {
                app.use(webpackMiddleware(compiler, {
                    publicPath: config.output.publicPath,
                    stats: {
                        colors: true,
                        exclude: [/webpack/, /^\.\/~\//],
                    }
                }));
                app.use(webpackHotMiddleware(compiler));
            }
            app.listen(port, () => {
                bs();
                resolve();
            });
        } else {
            reject('Templates not found');
        }
    });
}

module.exports = {
    default: startServer,
};
// startServer();

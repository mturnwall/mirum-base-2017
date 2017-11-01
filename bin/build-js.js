const webpack = require('webpack');
const log = require('./log');

const env = (process.argv.includes('--prod')) ? 'prod' : 'dev';

const config = require('../webpack_' + env + '.config.js')({ env: env });

function buildJs() {
    return new Promise((resolve, reject) => {
        webpack(config, (err, stats) => {
            if (err) {
                log('error', `A webpack error has occurred ${err}`);
                return reject(err);
            }
            if (stats.hasErrors()) {
                log('processing', stats.toString('errors-only'));
                return reject(stats.errors);
            }
            const statsString = stats.toString({
                errors: true,
                colors: true,
            });
            log('success', stats);
            return resolve()
        });
    });
}

module.exports = {
    default: buildJs,
};

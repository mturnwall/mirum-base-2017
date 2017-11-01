const run = require('./run');
const clean = require('./clean');
const buildCss = require('./build-css');
const buildJs = require('./build-js');
const buildHtml = require('./build-html');
const copy = require('./copy');
const log = require('./log');

async function build(options = []) {
    const isProd = options.includes('--prod');
    try {
        await run(clean);
        if (isProd) {
            await run(buildJs);
        }
        await run(buildCss);
        await run(buildHtml, options);
        await run(copy);
    } catch(err) {
        log('error', `build error: ${err}`);
    }
}

module.exports = {
    default: build,
};

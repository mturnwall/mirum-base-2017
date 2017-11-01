const fs = require('fs');
const mkdirp = require('mkdirp');
const sass = require('node-sass');
const importer = require('node-sass-magic-importer');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const run = require('./run');
const chokidar = require('chokidar');
const log = require('./log');

const cssDir = process.env.npm_package_config_cssOut;
const sassFilename = process.env.npm_package_config_cssMain;

function compileSass() {
    return sass.renderSync({
        file: `./src/sass/${sassFilename}.scss`,
        outFile: `${cssDir}/master.css`,
        outputStyle: 'expanded',
        sourceMap: true,
        sourceMapContents: true,
        importer: importer(),
    });
}

function processCss(css) {
    const processor = postcss([autoprefixer]);
    processor.process(css.css, {
            from: `./src/sass/${sassFilename}.scss`,
            to: `${cssDir}/master.css`,
            map: {
                prev: css.map.toString(),
                inline: false,
            },
        })
        .then((postResult) => {
            fs.writeFileSync(`${cssDir}/${sassFilename}.css`, postResult.css, (err) => {
                if (err) {
                    console.log('writeFile error:', err);
                }
            });
            if (postResult.map) {
                fs.writeFileSync(`${cssDir}/${sassFilename}.css.map`, postResult.map, (err) => {
                    if (err) {
                        console.log('writeFile error:', err);
                    }
                });
            }
        });
}

function watchCss() {
    log('notice', 'Start watching sass files...');
    const watcher = chokidar.watch('src/sass');
    watcher.on('change', async (filepath) => {
        log('success', `${filepath} was updated.`);
        await run(buildCss);
    })
}

function buildCss(options) {
    const watch = options.includes('--watch');
    if (!fs.existsSync(cssDir)) {
        mkdirp.sync(cssDir, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
    return new Promise((resolve, reject) => {
        const result = compileSass();
        processCss(result);
        if (watch) {
            watchCss();
        }
        resolve();
    });
}

module.exports = {
    default: buildCss,
};


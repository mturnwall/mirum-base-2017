const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const fse = require('fs-extra');

const log = require('./log');
const pkg = require('../package.json');

const imagesDir = pkg.config.images;
const outputDir = pkg.config.destDir;

function getFileDifference(filename) {
    const oldSize = fse.statSync(`./src/${imagesDir}/${filename}`).size;
    const newSize = fse.statSync(`${outputDir}/${imagesDir}/${filename}`).size;
    console.log(oldSize);
    console.log(newSize);
    return (Math.round((oldSize - newSize) / 1024));
}


function processImages(opts) {
    log('notice', 'starting imagemin');
    const processing = imagemin([`./src/${imagesDir}/*.{jpg,png}`],`${outputDir}/${imagesDir}`, {
        plugins: [
            imageminJpegtran(),
            imageminPngquant({
                quality: '65-80',
            }),
        ]
    });

    return new Promise((resolve, reject) => {
        log('notice', 'starting imagemin processing');
        try {
            log('notice', 'try');
            processing.then((files) => {
                // log('notice', `files ${files.length}`);
                files.forEach((file) => {
                    console.log(fse.statSync(file.path).size);
                    // const sizeDiff = getFileDifference(file.path.replace(`${outputDir}/${imagesDir}/`, ''));
                    log('success', `${file.path.replace(`${outputDir}/${imagesDir}/`, '')} was processed`);
                    // log('success', sizeDiff);
                    resolve();
                })
            }).catch((err) => {
                log('error', err);
                reject(err);
            })
        } catch(err) {
            log('error', err);
            reject(err);
        }
        log('notice', 'done');
    });
}

module.exports = {
    default: processImages
};

const fse = require('fs-extra');
const pkg = require('../package.json');
const log = require('./log');

function copy() {
    const srcDir = pkg.config.srcDir;
    const destDir = pkg.config.destDir;
    const dirs = pkg.config.copyDirs;
    const promises = dirs.map((dir) => {
        const src = `./${srcDir}/${dir}`;
        const dest = `./${destDir}/${dir}`;
        return new Promise((resolve, reject) => {
            fse.copy(src, dest, err => {
                if (err) {
                    log('error', `There was an error copying the ${dir} directory`);
                } else {
                    log('success', `${dir} directory copied`);
                }
                return resolve();
            })
        });
    });
    return Promise.all(promises);
}

module.exports = {
    default: copy
};

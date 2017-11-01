const fs = require('fs');
const rimraf = require('rimraf');
const log = require('./log');

const dirs = ['dist', 'dev', 'includes'];

function cleanDirs() {
    return Promise.all(dirs.map((dir) => {
        return new Promise((resolve, reject) => {
            if (fs.existsSync(dir)) {
                rimraf(dir, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    log('success', `${dir} removed`);
                    resolve(result);
                });
            } else {
                resolve();
            }
        });
    }));
}

module.exports = {
    default: cleanDirs
};

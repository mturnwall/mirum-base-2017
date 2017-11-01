/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const log = require('./log');

function format(time) {
    return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

function run(fn, options = []) {
    const task = typeof fn.default === 'undefined' ? fn : fn.default;
    const start = new Date();
    log('processing', `[${format(start)}] Starting '${task.name}${options ? ` (${options})` : ''}'...`);
    return task(options).then((resolution) => {
        const end = new Date();
        const time = end.getTime() - start.getTime();
        log('processing', `[${format(end)}] Finished '${task.name}${options ? ` (${options})` : ''}' after ${time} ms`);
        log('processing', '-----------------');
        return resolution;
    }).catch((err) => {
        const end = new Date();
        log('processing', `[${format(end)}] '${task.name}${options ? ` (${options})` : ''}' finished with errors`);
        log('processing', '-----------------');
        throw err;
    });
}

if (require.main === module && process.argv.length > 2) {
    // eslint-disable-next-line no-underscore-dangle
    delete require.cache[__filename];
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const module = require(`./${process.argv[2]}.js`).default;
    let options = [];
    if (process.argv.length > 3) {
        options = process.argv.slice(3);
    }
    run(module, options).catch((err) => {
        console.error(err.stack);
        process.exit(1);
    });
}

module.exports = run;

const chalk = require('chalk');

const logTypes = {
    error: chalk.red.bold,
    success: chalk.green,
    warning: chalk.yellow.bold,
    notice: chalk.yellow,
    processing: chalk.blue.dim,
};
let isDebug = true;

function log(type, message) {
    if (isDebug) {
        console.log(logTypes[type](message));
    }
}

module.exports = log;

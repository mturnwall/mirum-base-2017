const webpack = require('webpack');

function buildConfig(env) {
    console.log(process.env.NODE_ENV);
    return require('./webpack_' + env + '.config.js')({ env: env });
}

module.exports = buildConfig;

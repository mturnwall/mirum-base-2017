const path = require('path');
const webpack = require('webpack');
const jsDir = process.env.npm_package_config_jsOut;
const AssetsPlugin = require('assets-webpack-plugin');
const pkg = require('./package.json');
module.exports = function () {
    return {
        context: path.resolve(__dirname, './src/scripts'),
        entry: [
            './main.js',
        ],
        output: {
            hashDigestLength: 8,
            path: path.resolve(__dirname, `./${jsDir}/`),
            publicPath: `/${jsDir}/`,
        },
        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'eslint-loader',
                    options: {
                        formatter: require('eslint/lib/formatters/table'),
                        failOnError: true,
                    }
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader:  'babel-loader',
                },
            ],
        },
        plugins: [
            new AssetsPlugin({
                prettyPrint: true,
                filename: 'assets.json',
                fullPath: false,
                path: path.join(__dirname, 'src', 'templates', 'data'),
            }),
        ]
    }
};

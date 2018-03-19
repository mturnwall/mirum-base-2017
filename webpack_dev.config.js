const path = require('path');
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.base');

const jsDir = process.env.npm_package_config_jsOut;

module.exports = function () {
    return webpackMerge(commonConfig(), {
        mode: "development",
        entry: [
            'webpack-hot-middleware/client',
        ],
        output: {
            path: '/',
            publicPath: '/js',
            filename: '[name].js',
            hotUpdateChunkFilename: '[hash].hot-update.js', // this stops the hmr version from being added to assets.json
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('dev')
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
        ],
        // devServer: {
        //     contentBase: [
        //         path.join(__dirname, 'dist'),
        //         path.join(__dirname, 'src/media'),
        //         path.join(__dirname, 'src/fonts'),
        //     ],
        //     port: 9001,
        //     compress: true,
        // },
        devtool: 'source-map',
    });
};

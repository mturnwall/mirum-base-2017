const webpackMerge = require('webpack-merge');
const webpack = require('webpack');

const commonConfig = require('./webpack.base');

module.exports = function () {
    return webpackMerge(commonConfig(), {
        output: {
            filename: '[name].[chunkhash].js',
        },
        plugins: [
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false,
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                beautify: false,
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                }
            })
        ],
        devtool: 'source-map',
    });
};

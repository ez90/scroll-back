'use strict';
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.config.base')

const devWebpackConfig = merge(baseWebpackConfig, {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: "./demo",
        clientLogLevel: 'warning',
        historyApiFallback: true,
        hot: true,
        compress: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './demo/index.html'
        })
    ]
})

module.exports = devWebpackConfig

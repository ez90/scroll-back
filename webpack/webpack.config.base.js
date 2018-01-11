'use strict';

const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: ["./src/index.js"],
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "js/[name].bundle.js"
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'eslint-loader',
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    },
    plugins: [
        // new CopyWebpackPlugin([
        //     { from: 'src/textures/', to: 'textures/' },
        //     { from: 'src/sounds/', to: 'sounds/' },
        // ])
    ]
};

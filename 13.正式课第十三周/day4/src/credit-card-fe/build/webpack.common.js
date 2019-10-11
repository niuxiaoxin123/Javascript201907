/**
 * @file webpack config
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2017/6/13
 */
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const vendors = [
    'react',
    'react-dom',
    'react-router',
    'redux',
    'react-redux',
    'redux-thunk'
];

const pkgPath = path.join(__dirname, '../package.json');
const pkg = require(pkgPath);
const theme = require('./theme');

module.exports = {
    entry: {
        vendors: vendors,
        index: [path.join(__dirname, '../src/index')]
    },
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: '/',
        filename: 'js/[name]-[hash:5].js',
        chunkFilename: 'js/[name]-[hash:5].chunk.js'
    },
    module: {
        noParse: ['/node_modules/react/react'],
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loaders: ['babel'],
                exclude: [/node_modules/]
            },
            {
                test: /\.s[c|a]ss$/,
                include: [
                    /node_modules/, /src\/index\.s[c|a]ss/
                ],
                loader: ExtractTextPlugin.extract('style',
                    'css!postcss!'
                    + `sass?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`
                )
            },
            {
                test: /\.s[c|a]ss$/,
                exclude: [
                    /node_modules/, /src\/index\.s[c|a]ss/
                ],
                loader: ExtractTextPlugin.extract(
                    'style',
                    'css?modules&localIdentName=[name]__[local]-[hash:base64:5]!postcss!sass?sourceMap=true'
                )
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css')
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(png|gif|jpg|svg|ico|jpeg)$/,
                loader: 'url?limit=3072&name=img/[name].[hash:5].[ext]'
            },
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                include: [/iconfont/],
                loader: 'url?limit=1024&name=font/[name].[hash:5].[ext]'
            }
        ]
    },
    postcss: [autoprefixer]
};

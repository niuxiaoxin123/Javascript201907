/**
 * @file webpack config
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2017/6/13
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const commonWebpack = require('./webpack.common');

module.exports = Object.assign({}, commonWebpack, {
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            favicon: path.join(__dirname, '../favicon.ico'),
            title: '百度信用卡中心_银行官方办理',
            inject: true,
            filename: 'index.html',
            template: path.join(__dirname, '../public/index.html'),
            chunks: ['vendors', 'index']
        }),
        new ExtractTextPlugin('css/[name].[chunkhash:5].css', {allChunks: true}),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors'
        })
    ],
    externals: {
        'BMap': 'BMap'
    }
});

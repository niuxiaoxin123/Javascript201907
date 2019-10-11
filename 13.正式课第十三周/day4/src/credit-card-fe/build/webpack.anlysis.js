/**
 * @file webpack config
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2017/6/13
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');

const staticRoute = '/creditstatic/credit-card-fe/'; // 线上环境

const commonWebpack = require('./webpack.common');

module.exports = Object.assign({}, commonWebpack, {
    devtool: false,
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: staticRoute,
        filename: 'js/[name]-[chunkhash:5].js',
        chunkFilename: 'js/[name]-[chunkhash:5].chunk.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new BundleAnalyzerPlugin(),
        new ExtractTextPlugin('css/[name].[chunkhash:5].css', {allChunks: true}),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors'
        }),
        // 删除类似的重复代码
        new webpack.optimize.DedupePlugin(),
        // 压缩代码
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,
                beautify: false
            },
            compress: {
                warnings: false,
                /* eslint-disable */
                drop_console: true
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        // 合并块
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            favicon: path.join(__dirname, '../favicon.ico'),
            title: '百度信用卡中心_银行官方办理',
            inject: true,
            filename: 'index.html',
            template: path.join(__dirname, '../public/index.html'),
            chunks: ['vendors', 'index'],
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            hash: true
        })
    ]
});

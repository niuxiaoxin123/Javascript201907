/**
 * @file web dev server
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2017/6/13
 */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./server.config');

let webpackConfig = require('./build/webpack.dev');
// 将执替换 js 内联进去
webpackConfig.entry.index.unshift(`webpack-dev-server/client?http://${config.domain}:${config.port}`, 'webpack/hot/dev-server');
let proxy = config.proxyConfig();

const compiler = webpack(webpackConfig);

const server = new WebpackDevServer(compiler, {
    historyApiFallback: true,
    hot: true,
    noInfo: true,
    clientLogLevel: 'info',
    publicPath: '/',
    contentBase: './dist',
    stats: {colors: true},
    proxy: proxy,
    open: true
});

server.listen(config.port, config.domain, function (err) {
    if (err) {
        console.log(err);
    }
    console.log(`Listening at http://${config.domain}:${config.port}...`);
});

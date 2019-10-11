/**
 * @file theme
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2017/6/13
 */
const publicPath = process.env.NODE_ENV === 'production' ? '/static/exchange-center/' : '';

module.exports = {
    '@icon-url': '"' + publicPath + 'iconfont' + '"'
};

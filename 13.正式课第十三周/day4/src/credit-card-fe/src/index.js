/**
 * @file 主站主程序主入口 js
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */

import './common/js/flexible';
// import './common/js/bdTongji';
import 'babel-polyfill';
import './common/js/global';
import fastclick from 'fastclick';
import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import './index.scss';
import reducer from './rootReducer';
import App from './pages/App';
import PCClientsPage from './pages/pcClientsPage/index';
import hyphenate from '../src/common/js/hyphenate';

fastclick.attach(document.body);
let requestFrom = hyphenate.getSearchString().requestFrom;

const isInwallet = () => {
    let userAgent = navigator.userAgent;
    if (/baiduwallet/i.test(userAgent) || requestFrom === 'dxm' || requestFrom === 'walletApp') {
        return true;
    }

    return false;
};

// 判断是否在百度地图内
const isBDMap = () => {
    let userAgent = navigator.userAgent;
    return userAgent.indexOf('baidumap_') > -1;
};

// 判断是否在微信app内
const isWXApp = () => {
    let userAgent = navigator.userAgent.toLowerCase();
    return userAgent.indexOf('micromessenger') > -1;
};

// 判断是否在招聘虫内
const isZPBug = () => hyphenate.getSearchString().requestFrom === 'zhaopinchong';

// 判断用户的设备是否是电脑
const isPC = () => {
    if (!(/mobile/i.test(navigator.userAgent)) && requestFrom === 'edm') {
        return true;
    }
    return false;
};

window.isInWallet = isInwallet();
window.isBDMap = isBDMap();
window.isWXApp = isWXApp();
window.isZPBug = isZPBug();
window.isPC = isPC();


// let queryObj = hyphenate.getSearchString();
// queryObj.requestFrom && sessionStorage.setItem('requestFrom', queryObj.requestFrom);
const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunkMiddleware)
    )
);


render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)


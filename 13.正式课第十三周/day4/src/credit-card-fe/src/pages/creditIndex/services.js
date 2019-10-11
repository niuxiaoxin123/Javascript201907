/**
 * @file 程序主入口 js
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2017/6/15
 */

import request from '../../common/js/request';
import URL from '../../common/constant/url';

export const fetch = (data = {}) => request(URL.GET_CREDIT_INDEX, {
    method: 'post',
    body: data
});

export const fetchHomeList = (data = {}) => request(URL.GET_CARD_LIST, {
    method: 'post',
    body: data
});

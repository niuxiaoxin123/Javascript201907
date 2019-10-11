/**
 * @file 程序主入口 js
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2017/6/15
 */

import request from '../../common/js/request';
import URL from '../../common/constant/url';

export const fetch = (data = {}) => request(URL.GET_PERSONAL_INFO, {
    method: 'post',
    body: data
});
export const fetchUserInfo = (data = {}) => request(URL.GET_USER_INFO, {
    method: 'get',
    body: data
});

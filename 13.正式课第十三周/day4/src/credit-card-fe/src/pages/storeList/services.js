/**
 * @file services
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */

import request from '../../common/js/request';
import URL from '../../common/constant/url';

export const fetch = (data = {}) => request(URL.GET_STORE_LIST, {
    method: 'get',
    body: data,
    encAndDec: true // 接口需要加解密
});

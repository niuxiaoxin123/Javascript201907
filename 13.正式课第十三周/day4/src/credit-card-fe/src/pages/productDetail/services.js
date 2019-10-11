/**
 * @file services
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2018/6/27
 */

import request from '../../common/js/request';

export const fetch = (data = {}) => request(global.CONSTS.URL.GET_PRODUCT_DETAIL, {
    method: 'get',
    body: data
});
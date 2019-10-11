/**
 * @file services js
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2019/6/6
 */

import request from '../../common/js/request';

export const fetchProductList = (data = {}) => request(global.CONSTS.URL.GET_PRODUCT_LIST, {
    method: 'get',
    body: data
});
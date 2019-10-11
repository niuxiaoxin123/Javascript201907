/**
 * @file services
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2019-5-7
 */

import request from '../../common/js/request';
import URL from '../../common/constant/url';

export const fetch = (data = {}) => request(URL.GET_PRODUCT_JUMPURL, {
    method: 'post',
    body: data
});

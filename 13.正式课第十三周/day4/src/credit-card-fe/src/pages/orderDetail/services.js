/**
 * @file services
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/28
 */

import request from '../../common/js/request';
import URL from '../../common/constant/url';

export const fetch = (data = {}) => request(URL.GET_ORDER_DETAIL, {
    method: 'post',
    body: data
});
export const fetchCoupon = (data = {}) => request(URL.GET_COUPON_DETAIL, {
    method: 'post',
    body: data
});

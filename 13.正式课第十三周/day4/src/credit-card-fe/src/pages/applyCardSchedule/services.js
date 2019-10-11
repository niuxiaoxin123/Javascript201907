/**
 * @file services
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */

import request from '../../common/js/request';

export const fetch = (data = {}) => request(CONSTS.URL.GET_APPLY_PLAN, {
    method: 'get',
    body: data
});
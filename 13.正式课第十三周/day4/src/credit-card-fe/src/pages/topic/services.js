/**
 * @file services
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2018/10/9
 */

import request from '../../common/js/request';
import URL from '../../common/constant/url';

export const fetch = (data = {}) => request(URL.GET_TOPIC_DETAIL, {
    method: 'get',
    body: data
});
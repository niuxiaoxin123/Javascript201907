/**
 * @file services js
 * @author v_zhangxiaoran(v_zhangxiaoran@baidu.com)
 * @date 2018/10/29
 */
import request from '../../../common/js/request';
import {CONSTS} from '../../../common/constant';
export const fetch = (data = {}) => request(CONSTS.URL.GET_STORE_DETAIL, {
    method: 'get',
    body: data,
    encAndDec: true
});

// 获取纠错选项列表
export const fetchCorrectionList = (data = {}) => request(CONSTS.URL.GET_CORRECTION_LIST, {
    method: 'get',
    body: data
});

// 推卡位列表
export const fetchRecocardList = (data = {}) => request(CONSTS.URL.GET_RECOCARD_LIST, {
    method: 'get',
    body: data
});
/**
 * @file 公共services
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2018/8/15
 */

import request from './common/js/request';
import URL from './common/constant/url';

// 获取个人动态
export const fetchPersonalDynamic = (data = {}) => request(URL.GET_PERSONAL_DYNAMIC, {
    method: 'post',
    body: data
});

// 物料中心请求
export const fetchBannerPic = (data = {}) => request(URL.GET_BANNER_PIC, {
    method: 'get',
    body: data
});

// 推荐卡
export const fetchCardRecommend = (data = {}) => request(URL.GET_CARD_RECOMMEND, {
    method: 'post',
    body: data
});

// 推荐贷款
export const fetchProductRecommend = (data = {}) => request(URL.GET_PRODUCT_RECOMMEND, {
    method: 'post',
    body: data
});

// 产品申请跳转
export const fetchProductApply = (data = {}) => request(URL.GET_PRODUCT_APPLY, {
    method: 'post',
    body: data
});
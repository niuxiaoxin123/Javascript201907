/**
 * @file actions
 * @author v_zhangxiaoran(v_zhangxiaoran@baidu.com)
 * @date 2018/10/29
 */
import * as services from './services';

export const STORE_DETAIL_FETCH = 'STORE_DETAIL_FETCH';
export const FETCH_CARDDETAIL_CACHE = 'FETCH_CARDDETAIL_CACHE';
export const FETCH_BANK_BURIALPOINT = 'FETCH_BANK_BURIALPOINT';
export const RECOCARD_LIST_FETCH = 'RECOCARD_LIST_FETCH';
export const fetch = (data, cb) => function (dispatch) {
    services.fetch().then(
        res => {
            dispatch({
                type: STORE_DETAIL_FETCH,
                content: res.data.content
            });
            !!cb && cb(res.data);
        }
    ).catch(
        function (err) {
            console.log(err);
        }
    );
};
// 详情页清缓存
export const fetchCache = () => function (dispatch) {
    dispatch({
        type: FETCH_CARDDETAIL_CACHE,
        content: {}
    });
};

// 获取纠错选项列表
export const fetchCorrectionList = (data, cb) => function (dispatch) {
    services.fetchCorrectionList(data).then(
        res => {
            !!cb && cb(res.data);
        }
    ).catch(
        function (err) {
            console.log(err);
        }
    );
};

// 推卡位列表
export const fetchRecocardList = (data, cb) => function (dispatch) {
    // console.log(data, 67);
    services.fetchRecocardList(data).then(
        res => {
            dispatch({
                type: RECOCARD_LIST_FETCH,
                recocardListContent: res.data.content
            });
            !!cb && cb(res.data);
        }
    ).catch(
        function (err) {
            console.log(err);
        }
    );
};

/**
 * @file actions
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */
import * as services from './services';
import hyphenate from '../../common/js/hyphenate';

export const INVALID_COUPON_LIST_FETCH = 'INVALID_COUPON_LIST_FETCH';
export const COUPON_LIST_SHOW_MODAL = 'COUPON_LIST_SHOW_MODAL';
export const INVALID_COUPON_LIST_FETCH_PAGER = 'INVALID_COUPON_LIST_FETCH_PAGER';
export const CARDLIST_SHOW_MODAL = 'CARDLIST_SHOW_MODAL';

export const fetch = (data, pagerInfo, listCache, clear) => function (dispatch) {
    // 获取 url 中查询字符串
    let queryObj = hyphenate.getSearchString();
    data = Object.assign({
        valid: '0'
    }, data);
    // 如果传了缓存则渲染缓存
    if (listCache) {
        let {list, paginator} = listCache;
        dispatch({
            type: INVALID_COUPON_LIST_FETCH,
            list: list,
            paginator: paginator
        });
        return;
    }
    // 如果清除缓存则：
    if (clear) {
        dispatch({
            type: INVALID_COUPON_LIST_FETCH,
            clear,
            list: [],
            paginator: {}
        });
        return;
    }

    services.fetch(data).then(
        res => {
            let couponList = res.data.content.list;
            let paginator = res.data.content.paginator;
            let currentRecommendList = res.data.content.currentRecommendList;
            if (pagerInfo) {
                const list = couponList;
                if (list && list.length) {
                    pagerInfo.success();
                    dispatch({
                        type: INVALID_COUPON_LIST_FETCH_PAGER,
                        list: list,
                        paginator: paginator
                    });
                } else {
                    // 当返回的 list 列表为空或不存在则表示加载完成
                    pagerInfo.complete();
                }
            } else {
                dispatch({
                    type: INVALID_COUPON_LIST_FETCH,
                    list: couponList,
                    paginator: paginator
                    // currentRecommendList: currentRecommendList
                });
            }
        }
    ).catch(
        err => {
            pagerInfo && pagerInfo.fail();
        }
    );
};
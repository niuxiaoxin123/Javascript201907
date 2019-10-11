/**
 * @file actions
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */
import * as services from './services';
import hyphenate from '../../common/js/hyphenate';

export const COUPON_LIST_FETCH = 'COUPON_LIST_FETCH';
export const COUPON_LIST_SHOW_MODAL = 'COUPON_LIST_SHOW_MODAL';
export const COUPON_LIST_FETCH_PAGER = 'COUPON_LIST_FETCH_PAGER';
export const CARDLIST_SHOW_MODAL = 'CARDLIST_SHOW_MODAL';

export const fetch = (data, pagerInfo, listCache, clear) => function (dispatch) {
    // 获取 url 中查询字符串
    let queryObj = hyphenate.getSearchString();
    data = Object.assign({
        valid: '1'
    }, data);

    // 如果传了缓存则渲染缓存
    if (listCache) {
        let {list, paginator, currentRecommendList} = listCache;
        dispatch({
            type: COUPON_LIST_FETCH,
            list: list,
            paginator: paginator,
            currentRecommendList: currentRecommendList
        });
        return;
    }
    // 如果清除缓存则：
    if (clear) {
        dispatch({
            type: COUPON_LIST_FETCH,
            clear,
            list: [],
            paginator: {},
            currentRecommendList: []
        });
        return;
    }

    // !pagerInfo && hyphenate.setSearchString(Object.assign(queryObj, data)); // 翻页时不需要重置 url
    // 没有缓存则重新请求数据
    services.fetch(data).then(
        res => {
            let couponList = res.data.content.list;
            let paginator = res.data.content.paginator;
            let currentRecommendList = res.data.content.currentRecommendList;
            if (pagerInfo) {
                let list = couponList;
                if (list && list.length) {
                    pagerInfo.success();
                    dispatch({
                        type: COUPON_LIST_FETCH_PAGER,
                        list: list,
                        paginator: paginator
                    });
                } else {
                    // 当返回的 list 列表为空或不存在则表示加载完成
                    pagerInfo.complete();
                }
            } else {
                dispatch({
                    type: COUPON_LIST_FETCH,
                    list: couponList,
                    paginator: paginator,
                    currentRecommendList: currentRecommendList
                });
            }
        }
    ).catch(
        err => {
            pagerInfo && pagerInfo.fail();
        }
    );
};

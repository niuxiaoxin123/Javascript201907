/**
 * @file actions
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */
import * as services from './services';
import hyphenate from '../../common/js/hyphenate';

export const CARDLIST_FETCH = 'CARDLIST_FETCH';
export const CARDLIST_SHOW_MODAL = 'CARDLIST_SHOW_MODAL';
export const CARDLIST_FETCH_PAGER = 'CARDLIST_FETCH_PAGER';

let pagerInfoM = null;

export const fetch = (data, pagerInfo, resetPageInfoM = false) => function (dispatch) {
    // 获取 url 中查询字符串
    let queryObj = hyphenate.getSearchString();

    // 翻页时不需要重置 url
    !pagerInfo
        && hyphenate.setSearchString(Object.assign(queryObj, data));

    // 首屏请求时将 pagerInfoM 置为 null，防止在 pager 未mount时调用 setstate
    !data && (pagerInfoM = null);
    resetPageInfoM && (pagerInfoM = null);

    services.fetch(data).then(
        res => {
            let filter = res.data.content.filter;
            let cardList = res.data.content.cardList;
            filter && filter.forEach(function (filterItem, index) {
                const code = filterItem.selectedCode;

                filterItem.list.forEach(function (item, idx) {
                    if (item.code === code) {
                        item.isSelected = true;
                        filterItem.label = item.name;
                    }
                });
                filterItem.showModal = false;
            });

            let paginator = res.data.content.paginator;

            if (pagerInfo) {
                pagerInfoM = pagerInfo;

                const list = cardList;

                if (list && list.length) {
                    pagerInfo.success();
                    dispatch({
                        type: CARDLIST_FETCH_PAGER,
                        list: list,
                        paginator: paginator
                    });
                } else {
                    // 当返回的 list 列表为空或不存在则表示加载完成
                    pagerInfo.complete();
                }
            } else {
                // 每次点击筛选后将 complete 的值手动置为 false
                pagerInfoM && pagerInfoM.complete(false);
                pagerInfoM = null;

                dispatch({
                    type: CARDLIST_FETCH,
                    filter: filter,
                    list: cardList,
                    paginator: paginator
                });
            }
        }
    ).catch(
        err => {
            pagerInfo && pagerInfo.fail();
        }
    );
};

export const showModal = (filter, index) => function (dispatch) {
    filter.forEach((item, idx) => {
        if (index !== undefined && idx === index) {
            item.showModal = !item.showModal;
        } else {
            item.showModal = false;
        }
    });

    dispatch({
        type: CARDLIST_SHOW_MODAL,
        filter: filter,
        selectList: filter[index] ? filter[index].list : []
    });
};

export const updateCardListData = (listCache, clear) => function (dispatch) {
    let {filter, list, paginator} = listCache;
    if (clear) {
        dispatch({
            type: CARDLIST_FETCH,
            clear: clear,
            filter: [],
            list: [],
            paginator: {}
        });
        return;
    }
    dispatch({
        type: CARDLIST_FETCH,
        filter: filter,
        list: list,
        paginator: paginator
    });
};

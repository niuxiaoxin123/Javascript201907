/**
 * @file actions
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */
import * as services from './services';
import hyphenate from '../../common/js/hyphenate';
import consts from '../../common/constant/const';
import pick from 'lodash/pick';

export const STORE_LIST_FETCH = 'STORE_LIST_FETCH';
export const STORE_LIST_SHOW_MODAL = 'STORE_LIST_SHOW_MODAL';
export const STORE_LIST_FETCH_PAGER = 'STORE_LIST_FETCH_PAGER';

let pagerInfoM = null;

export const fetch = (data, pagerInfo, resetSearchStr = false, resetPageInfoM = false, mapAccuracy = null) => function (dispatch) {
    // 获取 url 中查询字符串
    let queryObj = hyphenate.getSearchString();
    // 转码参数中的city和local字段
    data.city && (data.city = data.city);
    data.local && (data.local = data.local);

    // 翻页时不需要重置 url
    !pagerInfo
        && hyphenate.setSearchString(Object.assign(queryObj, data));

    // 选择完城市之后重置url？后的search参数，筛选项的数据需要重置-需要lng lat local和逐级携带字段字段
    let storeListKeys = ['lng', 'lat', 'local'];
    let queryOptions = pick(queryObj, [...consts.validKeys, ...storeListKeys]);
    resetSearchStr && hyphenate.setSearchString({...data, ...queryOptions});

    // 首屏请求时将 pagerInfoM 置为 null，防止在 pager 未mount时调用 setstate
    !data && (pagerInfoM = null);
    resetPageInfoM && (pagerInfoM = null);

    services.fetch(data).then(
        res => {
            let searchObj = hyphenate.getSearchString();
            let location = res.data.content.location;
            if (!searchObj.city || !searchObj.local) {
                searchObj = {
                    ...pick(searchObj, [...consts.validKeys, ...storeListKeys]),
                    ...location,
                    city: location.city,
                    local: location.city
                };
                hyphenate.setSearchString(searchObj);
            }
            let filter = res.data.content.filter;
            let storeList = res.data.content.storeList;
            filter && filter.forEach(function (filterItem, index) {
                const code = filterItem.selectedCode;
                filterItem.list && filterItem.list.forEach(function (item, idx) {
                    if (filterItem.key === 'district' && mapAccuracy === null && item.code === 'all') {
                        item.name = '全部区县';
                    }
                    if (item.code === code) {
                        item.isSelected = true;
                        filterItem.label = item.name;
                    }
                });
                !filterItem.list && (filterItem.label = filterItem.name)
                filterItem.showModal = false;
            });

            let paginator = res.data.content.paginator;

            if (pagerInfo) {
                pagerInfoM = pagerInfo;

                const list = storeList;

                if (list && list.length) {
                    pagerInfo.success();
                    dispatch({
                        type: STORE_LIST_FETCH_PAGER,
                        list,
                        paginator,
                        mapAccuracy
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
                    type: STORE_LIST_FETCH,
                    filter,
                    list: storeList,
                    paginator,
                    mapAccuracy
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
        type: STORE_LIST_SHOW_MODAL,
        filter: filter,
        selectList: filter[index] ? filter[index].list : []
    });
};

export const updateStoreListData = (listCache, clear, mapAccuracy) => function (dispatch) {
    let { filter, list, paginator } = listCache;
    if (clear) {
        dispatch({
            type: STORE_LIST_FETCH,
            clear: clear,
            filter: [],
            list: [],
            paginator: {},
            mapAccuracy
        });
        return;
    }
    dispatch({
        type: STORE_LIST_FETCH,
        filter,
        list,
        paginator,
        mapAccuracy
    });
};

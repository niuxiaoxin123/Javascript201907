/**
 * @file actions
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */
import * as services from './services';
import hyphenate from '../../common/js/hyphenate';

export const KNOWLEDGE_LIST_FETCH = 'KNOWLEDGE_LIST_FETCH';
export const KNOWLEDGE_LIST_SHOW_MODAL = 'KNOWLEDGE_LIST_SHOW_MODAL';
export const KNOWLEDGE_LIST_FETCH_PAGER = 'KNOWLEDGE_LIST_FETCH_PAGER';
export const CARDLIST_SHOW_MODAL = 'CARDLIST_SHOW_MODAL';

export const fetch = (data, pagerInfo) => function (dispatch) {
    // 获取 url 中查询字符串
    let queryObj = hyphenate.getSearchString();

    !pagerInfo && hyphenate.setSearchString(Object.assign(queryObj, data)); // 翻页时不需要重置 url



    services.fetch(data).then(
        res => {
            let knowledgeList = res.data.content.list;
            let paginator = res.data.content.paginator;
            if (pagerInfo) {
                const list = knowledgeList;
                if (list && list.length) {
                    pagerInfo.success();
                    dispatch({
                        type: KNOWLEDGE_LIST_FETCH_PAGER,
                        list: list,
                        paginator: paginator
                    });
                } else {
                    // 当返回的 list 列表为空或不存在则表示加载完成
                    pagerInfo.complete();
                }
            } else {
                dispatch({
                    type: KNOWLEDGE_LIST_FETCH,
                    list: knowledgeList,
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

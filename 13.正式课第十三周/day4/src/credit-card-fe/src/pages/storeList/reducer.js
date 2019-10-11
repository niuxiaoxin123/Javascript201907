/**
 * @file reducer
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */

import {
    STORE_LIST_FETCH,
    STORE_LIST_SHOW_MODAL,
    STORE_LIST_FETCH_PAGER
} from './actions';

const init = {
    endFetching: false,
    filter: [],
    list: {},
    selectList: {},
    paginator: {},
    mapAccuracy: null
};

export default function storeList(state = init, action) {
    switch (action.type) {
        case STORE_LIST_FETCH:
            return {
                ...state,
                endFetching: action.clear ? false : true,
                filter: action.filter,
                list: action.list,
                paginator: action.paginator,
                mapAccuracy: action.mapAccuracy
            };
            break;
        case STORE_LIST_FETCH_PAGER:
            return {
                ...state,
                list: state.list.concat(action.list),
                paginator: action.paginator,
                mapAccuracy: action.mapAccuracy
            };
            break;
        case STORE_LIST_SHOW_MODAL:
            return {
                ...state,
                filter: action.filter,
                selectList: action.selectList
            };
            break;
        default:
            return state;
    }
}

/**
 * @file reducer
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */

import {
    CARDLIST_FETCH,
    CARDLIST_SHOW_MODAL,
    CARDLIST_FETCH_PAGER
} from './actions';

const init = {
    endFetching: false,
    filter: [],
    list: {},
    selectList: {},
    paginator: {}
};

export default function telList(state = init, action) {
    switch (action.type) {
        case CARDLIST_FETCH:
            return {
                ...state,
                endFetching: action.clear ? false : true,
                filter: action.filter,
                list: action.list,
                paginator: action.paginator
            };
            break;
        case CARDLIST_FETCH_PAGER:
            return {
                ...state,
                list: state.list.concat(action.list),
                paginator: action.paginator
            };
            break;
        case CARDLIST_SHOW_MODAL:
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

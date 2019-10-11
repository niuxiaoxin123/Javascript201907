/**
 * @file reducer
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */

import {
    COUPON_LIST_FETCH,
    COUPON_LIST_FETCH_PAGER
} from './actions';

const init = {
    endFetching: false,
    list: [],
    paginator: {},
    currentRecommendList: []
};

export default function couponList(state = init, action) {
    switch (action.type) {
        case COUPON_LIST_FETCH:
            return {
                ...state,
                endFetching: !action.clear,
                list: action.list,
                paginator: Object.assign({}, action.paginator),
                currentRecommendList: action.currentRecommendList
            };
            break;
        case COUPON_LIST_FETCH_PAGER:
            return {
                ...state,
                list: state.list.concat(action.list),
                paginator: action.paginator
            };
            break;
        default:
            return state;
    }
}

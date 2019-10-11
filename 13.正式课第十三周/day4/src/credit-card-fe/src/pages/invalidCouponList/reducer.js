/**
 * @file reducer
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */

import {
    INVALID_COUPON_LIST_FETCH,
    INVALID_COUPON_LIST_FETCH_PAGER
} from './actions';

const init = {
    endFetching: false,
    list: [],
    paginator: {}
};

export default function invalidCouponList(state = init, action) {
    switch (action.type) {
        case INVALID_COUPON_LIST_FETCH:
            return {
                ...state,
                endFetching: !action.clear,
                list: action.list,
                paginator: action.paginator
            };
            break;
        case INVALID_COUPON_LIST_FETCH_PAGER:
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

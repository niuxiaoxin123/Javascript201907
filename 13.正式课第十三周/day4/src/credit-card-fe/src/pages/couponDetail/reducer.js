/**
 * @file reducer
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/27
 */

import {
    COUPON_DETAIL_FETCH
} from './actions';

const init = {
    endFetching: false,
    content: {}
};

export default function couponDetail(state = init, action) {
    switch (action.type) {
        case COUPON_DETAIL_FETCH:
            return {
                ...state,
                endFetching: true,
                content: action.content
            };
            break;
        default:
            return state;
    }
}

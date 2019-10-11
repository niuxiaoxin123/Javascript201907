/**
 * @file reducer
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 208/6/21
 */

import {
    ORDERLIST_FETCH
} from './actions';

const init = {
    endFetching: false,
    list: {}
};

export default function orderList(state = init, action) {
    switch (action.type) {
        case ORDERLIST_FETCH:
            return {
                ...state,
                endFetching: true,
                cardList: action.data
            };
            break;
        default:
            return state;
    }
}

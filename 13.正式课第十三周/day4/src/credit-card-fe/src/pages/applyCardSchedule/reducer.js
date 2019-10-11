/**
 * @file reducer
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */

import {
    BANK_LIST_FETCH,
    BANNER_LIST_FETCH,
    CLEAR_REDUCER
} from './actions';

const init = {
    endFetching: false,
    bankList: []
};

export default function telList(state = init, action) {
    switch (action.type) {
        case BANK_LIST_FETCH:
            return {
                ...state,
                endFetching: true,
                bankList: action.data
            };
            break;
        case CLEAR_REDUCER:
            return {
                ...state,
                endFetching: false,
                bankList: []
            };
            break;
        default:
            return state;
    }
}

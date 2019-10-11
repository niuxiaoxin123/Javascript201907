/**
 * @file reducer
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2017/6/15
 */

import {
    CREDIT_INDEX_FETCH
} from './actions';

const init = {
    endFetching: false,
    list: {},
    userLogin: {}
};

export default function creditIndex(state = init, action) {
    switch (action.type) {
        case CREDIT_INDEX_FETCH:
            return {
                ...state,
                endFetching: true,
                list: action.data
            };
        default:
            return state;
    }
}

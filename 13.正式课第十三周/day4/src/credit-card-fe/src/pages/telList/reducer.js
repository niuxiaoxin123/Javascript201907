/**
 * @file reducer
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 208/6/21
 */

import {
    TELLIST_FETCH
} from './actions';

const init = {
    endFetching: false,
    list: {}
};

export default function telList(state = init, action) {
    switch (action.type) {
        case TELLIST_FETCH:
            return {
                ...state,
                endFetching: true,
                list: action.data
            };
            break;
        default:
            return state;
    }
}

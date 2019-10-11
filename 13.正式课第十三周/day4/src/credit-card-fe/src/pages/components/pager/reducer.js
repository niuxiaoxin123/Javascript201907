/**
 * @file reducer
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2017/6/15
 */

import {
    SCROLL_TOP_CACHE
} from './actions';

const init = {
    endFetching: false,
    data: {}
};

export default function listCache(state = init, action) {
    switch (action.type) {
        case SCROLL_TOP_CACHE:
            return {
                ...state,
                endFetching: true,
                data: Object.assign({}, state.data, action.data)
            };
            break;
        default:
            return state;
    }
}

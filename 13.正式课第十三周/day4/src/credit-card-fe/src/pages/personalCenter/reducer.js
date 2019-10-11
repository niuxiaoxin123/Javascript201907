/**
 * @file reducer
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2017/6/15
 */

import {
    PERSONALCENTER_FETCH,
    USER_INFO_FETCH
} from './actions';

const init = {
    endFetching: false,
    data: {},
    toOrderlist: false
};

export default function personalCenter(state = init, action) {
    switch (action.type) {
        case PERSONALCENTER_FETCH:
            return {
                ...state,
                endFetching: true,
                data: action.data
            };
            break;
        case USER_INFO_FETCH:
            return {
                ...state,
                endFetching: true,
                data: action.data
            };
            break;
        default:
            return state;
    }
}

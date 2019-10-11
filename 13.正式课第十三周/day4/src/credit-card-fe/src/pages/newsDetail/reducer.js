/**
 * @file reducer
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 208/6/21
 */

import {
    NEWSDETAIL_FETCH
} from './actions';

const init = {
    endFetching: false,
    data: {}
};

export default function telList(state = init, action) {
    switch (action.type) {
        case NEWSDETAIL_FETCH:
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

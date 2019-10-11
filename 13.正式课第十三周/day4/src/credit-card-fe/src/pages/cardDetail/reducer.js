/**
 * @file reducer
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/27
 */

import {
    CARDDETAIL_FETCH,
    CLEAR_CARDDETAIL_CACHE
} from './actions';

const init = {
    endFetching: false,
    content: {}
};

export default function cardDetail(state = init, action) {
    switch (action.type) {
        case CARDDETAIL_FETCH:
            return {
                ...state,
                endFetching: true,
                content: action.content
            };
            break;
        case CLEAR_CARDDETAIL_CACHE:
            return {
                ...state,
                endFetching: true,
                content: {}
            };
            break;
        default:
            return state;
    }
}

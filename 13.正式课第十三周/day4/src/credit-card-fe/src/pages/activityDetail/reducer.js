/**
 * @file reducer
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/27
 */

import {
    ACTIVITY_DETAIL_FETCH
} from './actions';

const init = {
    endFetching: false,
    detail: {}
};

export default function activityDetail(state = init, action) {
    switch (action.type) {
        case ACTIVITY_DETAIL_FETCH:
            return {
                ...state,
                endFetching: !action.clear,
                detail: action.detail
            };
            break;
        default:
            return state;
    }
}

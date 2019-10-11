/**
 * @file reducer
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2018/10/9
 */

import {
    TOPICDETAIL_FETCH,
} from './actions';

const init = {
    endFetching: false,
    content: {}
};

export default function topicDetail(state = init, action) {
    switch (action.type) {
        case TOPICDETAIL_FETCH:
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
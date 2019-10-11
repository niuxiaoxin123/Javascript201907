/**
 * @file reducer
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2018/6/27
 */

import {
    PRODUCTDETAIL_FETCH
} from './actions';

const init = {
    endFetching: false,
    content: {}
};

export default function productDetail(state = init, action) {
    switch (action.type) {
        case PRODUCTDETAIL_FETCH:
            return {
                ...state,
                endFetching: true,
                content: action.content
            };
        default:
            return state;
    }
}

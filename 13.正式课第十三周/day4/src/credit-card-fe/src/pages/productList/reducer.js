/**
 * @file reducer js
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2019/6/6
 */

import {
    PRODUCT_LIST_FETCH,
    // BANNER_LIST_FETCH,
    CLEAR_REDUCER
} from './actions';

const init = {
    endFetching: false,
    productListData: []
};

export default function productListReducer(state = init, action) {
    switch (action.type) {
        case PRODUCT_LIST_FETCH:
            return {
                ...state,
                endFetching: true,
                productListData: action.data
            };
            break;
        case CLEAR_REDUCER:
            return {
                ...state,
                endFetching: false,
                productListData: []
            };
            break;
        default:
            return state;
    }
}

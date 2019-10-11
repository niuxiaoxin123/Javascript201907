/**
 * @file reducer
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 208/6/28
 */

import {
    ORDERDETAIL_FETCH
} from './actions';
// import actionType from '../../common/constant/const';

const init = {
    endFetching: false,
    content: {}
    // showEntry: null
};

export default function telList(state = init, action) {
    switch (action.type) {
        case ORDERDETAIL_FETCH:
            return {
                ...state,
                endFetching: !action.clear,
                content: action.content
            };
            break;
        // case actionType.IS_SHOW_COUPON_ENTRY_FETCH:
        //     return {
        //         ...state,
        //         endFetching: true,
        //         showEntry: action.content
        //     };
        //     break;
        default:
            return state;
    }
}

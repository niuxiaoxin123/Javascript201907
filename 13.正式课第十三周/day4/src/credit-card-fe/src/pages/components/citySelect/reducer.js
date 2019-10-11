/**
 * @file reducer
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2017/6/15
 */

import {
    CITY_LIST,
    CITY_INDEX
} from './actions';

const init = {
    endFetching: false,
    data: {},
    index: -1,
    itemIndex: -1
};

export default function cityData(state = init, action) {
    switch (action.type) {
        case CITY_LIST:
            return {
                ...state,
                endFetching: true,
                data: Object.assign({}, state.data, action.data),
            };
            break;

        case CITY_INDEX:
            return {
                ...state,
                index: action.index,
                itemIndex: action.itemIndex

            };

        default:
            return state;
    }
}

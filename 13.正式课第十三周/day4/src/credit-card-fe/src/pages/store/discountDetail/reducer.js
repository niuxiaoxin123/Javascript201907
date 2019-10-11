/**
 * @file reducer js
 * @author v_zhangxiaoran(v_zhangxiaoran@baidu.com)
 * @date 2018/10/29
 */
import {
    STORE_DETAIL_FETCH,
    FETCH_CARDDETAIL_CACHE,
    FETCH_BANK_BURIALPOINT,
    RECOCARD_LIST_FETCH
} from './actions';

const init = {
    endFetching: false,
    content: {},
    recocardListContent: ''

}
export default function discountDetail(state = init, action) {
    switch (action.type) {
        case STORE_DETAIL_FETCH:
            return {
                ...state,
                endFetching: true,
                content: action.content
            };
            break;
        case FETCH_CARDDETAIL_CACHE:
            return {
                ...state,
                endFetching: true,
                content: {},
                recocardListContent: '',
                bannerList: []
            };
            break;
        case RECOCARD_LIST_FETCH:
            return {
                ...state,
                recocardListContent: action.recocardListContent
            };
            break;
        default:
            return state;
    }
}

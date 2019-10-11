/**
 * @file 公共reducer
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 208/8/15
 */

import {
    PERSONAL_DYNAMIC_FETCH,
    CACAH_SEARCH,
    BANNER_LIST_FETCH,
    FETCH_BANNER_CACHE,
    RECOMMEND_CARD,
    RECOMMEND_LOAN
} from './actions';

const init = {
    endFetching: false,
    personalDynamic: {},
    search: {},
    mateList: [],
    recommendCard: {
        endFetching: false,
        cardList: []
    },
    recommendLoan: {
        endFetching: false,
        loanList: []
    }
};

export default function commonState(state = init, action) {
    switch (action.type) {
        case PERSONAL_DYNAMIC_FETCH:
            return {
                ...state,
                endFetching: true,
                personalDynamic: action.data
            };
        case CACAH_SEARCH:
            return {
                ...state,
                endFetching: true,
                search: action.data
            };
        case BANNER_LIST_FETCH:
            return {
                ...state,
                endFetching: true,
                mateList: action.data
            };
        case FETCH_BANNER_CACHE:
            return {
                ...state,
                endFetching: false,
                mateList: []
            };
        case RECOMMEND_CARD:
            return {
                ...state,
                recommendCard: {
                    endFetching: true,
                    ...action.data
                }
            };
        case RECOMMEND_LOAN:
            return {
                ...state,
                recommendLoan: {
                    endFetching: true,
                    loanList: action.data
                }
            };
        default:
            return state;
    }
}

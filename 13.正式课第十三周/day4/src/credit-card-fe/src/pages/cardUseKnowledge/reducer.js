/**
 * @file reducer
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */

import {
    KNOWLEDGE_LIST_FETCH,
    KNOWLEDGE_LIST_SHOW_MODAL,
    KNOWLEDGE_LIST_FETCH_PAGER,
} from './actions';
// import { stat } from 'fs';

const init = {
    endFetching: false,
    list: {},
    paginator: {}
};

export default function knowledgeList(state = init, action) {
    switch (action.type) {
        case KNOWLEDGE_LIST_FETCH:
            return {
                ...state,
                endFetching: true,
                list: action.list,
                paginator: action.paginator
            };
            break;
        case KNOWLEDGE_LIST_FETCH_PAGER:
            return {
                ...state,
                list: state.list.concat(action.list),
                paginator: action.paginator
            };
            break;
        case KNOWLEDGE_LIST_SHOW_MODAL:
            return {
                ...state,
                filter: action.filter,
                selectList: action.selectList
            };
            break;
        default:
            return state;
    }
}

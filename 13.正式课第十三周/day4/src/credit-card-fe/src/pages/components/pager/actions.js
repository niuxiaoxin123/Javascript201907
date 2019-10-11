/**
 * @file pager组件 js
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2017/6/15
 */

export const SCROLL_TOP_CACHE = 'SCROLL_TOP_CACHE';

export const listCache = data => function (dispatch) {
    dispatch({
        type: SCROLL_TOP_CACHE,
        data: data
    });
};

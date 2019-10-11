/**
 * @file actions
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */
import * as services from './services';

export const NEWSDETAIL_FETCH = 'NEWSDETAIL_FETCH';

export const fetch = cb => function (dispatch) {

    services.fetch().then(
        res => {
            dispatch({
                type: NEWSDETAIL_FETCH,
                data: res.data.content
            });
            !!cb && cb();
        }
    ).catch(
        function (err) {
            console.log(err);
        }
    );
};
export const clearArticleDetailCache = () => function (dispatch) {
    dispatch({
        type: NEWSDETAIL_FETCH,
        data: {}
    });
};

/**
 * @file actions
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/27
 */
import * as services from './services';

export const ACTIVITY_DETAIL_FETCH = 'ACTIVITY_DETAIL_FETCH';

export const fetch = clear => function (dispatch) {
    if (clear) {
        dispatch({
            type: ACTIVITY_DETAIL_FETCH,
            detail: {},
            clear
        });
        return;
    }

    services.fetch().then(
        res => {
            dispatch({
                type: ACTIVITY_DETAIL_FETCH,
                detail: res.data.content
            });
        }
    ).catch(
        function (err) {
            console.log(err);
        }
    );
};
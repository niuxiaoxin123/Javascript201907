/**
 * @file actions
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/27
 */
import * as services from './services';

export const COUPON_DETAIL_FETCH = 'COUPON_DETAIL_FETCH';

export const fetch = clear => function (dispatch) {
    if (clear) {
        dispatch({
            type: COUPON_DETAIL_FETCH,
            content: null
        });
        return;
    }

    services.fetch().then(
        res => {
            // console.log(15, res);
            dispatch({
                type: COUPON_DETAIL_FETCH,
                content: res.data.content
            });
        }
    ).catch(
        function (err) {
            console.log(err);
        }
    );
};
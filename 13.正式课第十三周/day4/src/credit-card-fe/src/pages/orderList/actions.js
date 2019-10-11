/**
 * @file actions
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */
import * as services from './services';

export const ORDERLIST_FETCH = 'ORDERLIST_FETCH';

export const fetch = () => function (dispatch) {

    services.fetch().then(
        res => {
            dispatch({
                type: ORDERLIST_FETCH,
                data: res.data.content
            });
        }
    ).catch(
        function (err) {
            console.log(err);
        }
    );
};

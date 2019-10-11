/**
 * @file actions
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */
import * as services from './services';

export const TELLIST_FETCH = 'TELLIST_FETCH';

export const fetch = () => function (dispatch) {

    services.fetch().then(
        res => {
            dispatch({
                type: TELLIST_FETCH,
                data: res.data.content
            });
        }
    ).catch(
        function (err) {
            console.log(err);
        }
    );
};

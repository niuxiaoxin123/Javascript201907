/**
 * @file 程序主入口 js
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2017/6/15
 */
import * as services from './services';

export const PERSONALCENTER_FETCH = 'PERSONALCENTER_FETCH';
export const USER_INFO_FETCH = 'USER_INFO_FETCH';
export const fetch = () => function (dispatch) {

    services.fetch().then(
        res => {
            dispatch({
                type: PERSONALCENTER_FETCH,
                data: res.data.content
            });
        }
    ).catch(
        function (err) {
            console.log(err);
        }
    );
};

export const fetchUserInfo = () => function (dispatch) {
    services.fetchUserInfo().then(
        res => {
            dispatch({
                type: USER_INFO_FETCH,
                data: res.data.content
            });
        }
    ).catch(
        function (err) {
            console.log(err);
        }
    );
};
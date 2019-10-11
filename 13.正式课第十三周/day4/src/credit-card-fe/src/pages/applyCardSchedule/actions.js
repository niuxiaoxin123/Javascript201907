/**
 * @file 程序主入口 js
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2017/6/15
 */
import * as services from './services';

export const BANK_LIST_FETCH = 'BANK_LIST_FETCH';
export const CLEAR_REDUCER = 'CLEAR_REDUCER';

export const fetchIndex = (data = {}, cb) => function (dispatch) {
    services.fetch().then(
        res => {
            cb && cb(res);
            dispatch({
                type: BANK_LIST_FETCH,
                data: res.data.content.bankList
            });
        }
    ).catch(
        function (err) {
            console.log(err);
        }
    );
};

//  清空缓存
export const clearReducer = () => function (dispatch) {
    dispatch({
        type: CLEAR_REDUCER
    });
};


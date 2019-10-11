/**
 * @file actions js
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2019/6/6
 */
import * as services from './services';

export const PRODUCT_LIST_FETCH = 'PRODUCT_LIST_FETCH';
export const CLEAR_REDUCER = 'CLEAR_REDUCER';

export const fetchProductList = (data = {}, cb) => function (dispatch) {
    services.fetchProductList().then(
        res => {
            dispatch({
                type: PRODUCT_LIST_FETCH,
                data: res.data.content
            });
        }
    ).catch(
        function (err) {
            console.log(err);
        }
    );
};

//  清空缓存
export const clearProductListReducer = () => function (dispatch) {
    dispatch({
        type: CLEAR_REDUCER
    });
};


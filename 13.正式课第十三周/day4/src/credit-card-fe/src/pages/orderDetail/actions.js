/**
 * @file actions
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/28
 */
import * as services from './services';

export const ORDERDETAIL_FETCH = 'ORDERDETAIL_FETCH';

export const fetch = clear => function (dispatch) {
    if (clear) {
        dispatch({
            type: ORDERDETAIL_FETCH,
            content: {},
            clear
        });
        return;
    }
    // 获取卡详情数据
    services.fetch().then(
        res => {
            dispatch({
                type: ORDERDETAIL_FETCH,
                content: res.data.content
            });
        }
    ).catch(
        function (err) {
            console.log(err);
        }
    );
};

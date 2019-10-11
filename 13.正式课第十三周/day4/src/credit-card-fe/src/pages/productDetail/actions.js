/**
 * @file actions
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2019/4/30
 */
import * as services from './services';
export const PRODUCTDETAIL_FETCH = 'PRODUCTDETAIL_FETCH';

export const fetch = (data, cb) => function (dispatch) {
    services.fetch(data).then(
        res => {
            dispatch({
                type: PRODUCTDETAIL_FETCH,
                content: res.data.content
            });
            !!cb && cb(res.data.content);
        }
    ).catch(
        function (err) {
            console.log(err);
        }
    );
};
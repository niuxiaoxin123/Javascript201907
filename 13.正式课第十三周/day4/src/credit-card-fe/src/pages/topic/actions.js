/**
 * @file actions
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2018/10/9
 */
import * as services from './services';
export const TOPICDETAIL_FETCH = 'TOPICDETAIL_FETCH';

export const fetch = clean => function (dispatch) {
    if (clean) {
        dispatch({
            type: TOPICDETAIL_FETCH,
            content: {}
        });
    } else {
        services.fetch().then(
            res => {
                dispatch({
                    type: TOPICDETAIL_FETCH,
                    content: res.data.content
                });
            }
        ).catch(
            function (err) {
                console.log(err);
            }
        );
    }
};
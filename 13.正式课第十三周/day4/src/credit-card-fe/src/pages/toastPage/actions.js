/**
 * @file actions
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2019-5-7
 */
import * as services from './services';

export const fetch = cb => function (dispatch) {
    services.fetch().then(
        res => {
            !!cb && cb(res.data.content);
        }
    ).catch(
        function (err) {
            console.log(err);
        }
    );
};

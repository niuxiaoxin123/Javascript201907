/**
 * @file actions
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/27
 */
import * as services from './services';
export const CARDDETAIL_FETCH = 'CARDDETAIL_FETCH';
export const CLEAR_CARDDETAIL_CACHE = 'CLEAR_CARDDETAIL_CACHE';
import hyphenate from '../../common/js/hyphenate';

export const fetch = (data, cb) => function (dispatch) {

    services.fetch(data).then(
        res => {
            if (!res.data.content) {
                global.eventUpload.pvTj({
                    ek: 'cardDetail_404'
                });
            }
            if (res.data.content.sid) {
                hyphenate.setSearchString({
                    ...hyphenate.getSearchString(),
                    sid: res.data.content.sid
                });
            }
            global.eventUpload.pvTj({
                path: hyphenate.ctPath(), // 补行为轨迹统计埋点参数
                module: hyphenate.getSearchString().module
            });
            dispatch({
                type: CARDDETAIL_FETCH,
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
// 详情页清缓存
export const clearCache = () => function (dispatch) {
    dispatch({
        type: CLEAR_CARDDETAIL_CACHE,
        content: {}
    });
};
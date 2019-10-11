/**
 * @file 程序主入口 js
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2017/6/15
 */
import * as services from './services';
import hyphenate from '../../common/js/hyphenate';
import eventUpload from '../../common/js/eventUpload';

export const CREDIT_INDEX_FETCH = 'CREDIT_INDEX_FETCH';
export const HOME_CARD_LIST_FETCH = 'HOME_CARD_LIST_FETCH';

export const fetchIndex = (data = {}, cb) => function (dispatch) {

    services.fetch().then(
        res => {
            cb && cb(res);
            if (res.data.content.sid) {
                hyphenate.setSearchString({
                    ...hyphenate.getSearchString(),
                    sid: res.data.content.sid
                });
            }
            eventUpload.pvTj();
            dispatch({
                type: CREDIT_INDEX_FETCH,
                data: res.data.content
            });
        }
    ).catch(
        function (err) {
            console.log(err);
        }
    );
};
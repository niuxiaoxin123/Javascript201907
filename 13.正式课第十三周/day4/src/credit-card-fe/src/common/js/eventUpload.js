/**
 * @file 后台埋点
 * @author v_wangyaping@baidu.com
 * @param {Object} uploadData 需发往埋点接口的参数
 */

import request from './request';
import hyphenate from './hyphenate';
import URL from '../constant/url';

const fetch = (data = {}) => request(URL.GET_EVENT_UPLOAD, {
    method: 'post',
    body: data,
    notNeedAddUrlParams: true
}, true, 'JSON', true);

const uploadFetch = uploadData => {
    let {
        es = '',
        ek = '',
        ...others
    } = uploadData;
    let searchObj = hyphenate.getSearchString();
    let initParams = {
        'es': es || 'credit',                                  // es默认bp_home,不需传,若传则以传为准,一般不传
        'ek': ek || 'fepv',                                     // ek默认fepv,不需传,若传则以传为准
        'et': hyphenate.getTime(),                              // 时间戳(不传)
        'ev': {
            'chn': searchObj.requestFrom || '',                 // 渠道(不传)
            'tid': searchObj.tid || '',                         // tid实验号(不传)
            'sid': searchObj.sid || '',
            'ext': searchObj.ext || '',                         // sid策略编号(不传) 从url自动获取
            'url': location.href,                               // url默认为当前页面url(不需传,若传则以传为准)
            'bid': hyphenate.getCookie('BAIDUID'),              // 百度id，区分人(不传)
            ...others                                           // 用户传输的参数
        }
    };
    // 请求
    fetch(initParams)
        .then(res => console.log('埋点发送成功'))
        .catch(err => console.log('埋点发送失败'));
};

// 导出
export default {
    // // 用户行为统计
    // userBehaviorStatTj: uploadData => {
    //     uploadFetch({...uploadData, ek: 'user_behavior_stat'});
    // },
    // 页面pv统计
    pvTj: uploadData => {
        uploadFetch({ek: 'fepv', ...uploadData});
    },
    eventTj: uploadData => {
        uploadFetch({ek: 'fe_button_click', ...uploadData});
    }
};
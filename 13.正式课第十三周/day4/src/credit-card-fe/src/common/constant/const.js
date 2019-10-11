/**
 * @file 常量 js
 * 变量名称请用遵照代码规范
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2018/9/17
 */
export default {
    // 需要统计页面pv的页面路由转小写 如：路由telList 则此处为tellist
    // 首页埋点单独发是因为需要在wise接口回调里发埋点才能带上sid
    PV_TJ_ROUTE: [
        // '/',
        // 'bkrcredit',
        'storelist',
        'applycardschedule',
        'discountdetail',
        'productlist'
    ],
    // 需要统计用户行为轨迹的路由小写 与上面可重复但最好不要重复
    PATH_ROUTE: [
        'cardlist',
        // 'carddetail', 卡详情埋点单独发是因为需要在详情接口回调里发埋点才能带上sid-需补行为统计埋点参数
        'toastpage',
        'topic',
        'productdetail'
    ],
    // 需要从入口页逐级传递的key
    validKeys: [
        'requestFrom',
        'tid',
        'path',
        'module',
        'sid',
        'ip',
        'code',
        'ext'
    ],
    BANNER_CODE: {
        applyCardSchedule: '339102',
        discountDetail: '339101'
    }
};

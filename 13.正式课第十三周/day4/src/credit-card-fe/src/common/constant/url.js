/**
 * @file url常量 js
 * 变量名称请用遵照代码规范
 * @author xiangjian(xiangjian@baidu.com)
 * @date 2017/8/1
 */

export default {
    GET_COUPON_LIST: '/creditserver/coupon/list',                   // 获取优惠券列表
    GET_CREDIT_INDEX: '/creditserver/index/wise',                   // 获取首页数据
    GET_CARD_LIST: '/creditserver/card/list',                       // 获取卡列表
    GET_CARD_DETAIL: '/creditserver/card/detail',                   // 获取卡详情
    GET_ACTIVITY_DETAIL: '/creditserver/coupon/activity',           // 获取活动详情
    GET_TEL_LIST: '/creditserver/bank/list',                        // 获取客服电话
    GET_ARTICLE_LIST: '/creditserver/article/list',                 // 获取文章列表
    GET_CREDIT_APPLY: '/creditserver/order/apply',                  // 信用卡立即申请
    GET_ORDER_DETAIL: '/creditserver/order/detail',                 // 获取订单详情
    GET_ORDER_LIST: '/creditserver/order/list',                     // 获取订单列表
    GET_ARTICLE_DETAIL: '/creditserver/article/detail',             // 获取文章详情
    GET_PERSONAL_INFO: '/creditserver/personal/info',               // 获取个人信息
    GET_COUPON_DETAIL: '/creditserver/coupon/detail',               // 获取卡券详情
    GET_PERSONAL_DYNAMIC: '/creditserver/personal/dynamic',         // 获取个人动态
    GET_ORDER_TOAST: '/creditserver/order/toast',                   // 获取toast页面返回
    GET_TOPIC_DETAIL: '/creditserver/topic/detail',                 // 专题详情
    GET_STORE_LIST: '/creditserver/store/list',                     // 优惠商户列表
    GET_CITY_LIST: '/creditserver/city/list',                       // 城市列表
    GET_STORE_DETAIL: '/creditserver/store/detail',                 // 优惠详情
    GET_EVENT_UPLOAD: '/creditserver/event/upload',                 // 埋点
    GET_CORRECTION_LIST: '/creditserver/correction/list',           // 优惠纠错选项列表
    GET_RECOCARD_LIST: '/creditserver/bank/recocard',               // 推卡位列表
    GET_APPLY_PLAN: '/creditserver/bank/process',                   // 申卡进度
    GET_BANNER_PIC: '/creditserver/mate/list',                      // banner图
    GET_CARD_RECOMMEND: '/creditserver/card/recommend',             // 推荐卡
    GET_PRODUCT_RECOMMEND: '/creditserver/product/recommend',       // 推荐产品
    GET_PRODUCT_DETAIL: '/creditserver/product/detail',             // 产品详情
    GET_PRODUCT_LIST: '/creditserver/product/list',                 // 产品列表
    GET_PRODUCT_JUMPURL: '/creditserver/product/jumpUrl',           // 获取产品跳转地址 - toast页面
    GET_PRODUCT_APPLY: '/creditserver/product/apply'                // 产品申请跳转
};

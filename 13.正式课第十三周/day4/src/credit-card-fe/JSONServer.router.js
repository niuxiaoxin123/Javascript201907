/**
 * @file web dev server
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2017/6/13
 */

module.exports = {
    '/creditserver/bank/list': '/telList',
    '/creditserver/card/list': '/cardList',
    '/creditserver/index/wise': '/creditIndex',
    '/creditserver/article/list': '/knowledgeList',
    '/creditserver/card/detail': '/cardDetail',
    '/creditserver/order/detail': '/orderDetail',
    '/creditserver/order/list': '/orderList',
    '/creditserver/article/detail': '/newsDetail',
    '/creditserver/personal/info': '/personalCenter',
    '/creditserver/coupon/activity': '/activityDetail',         // 活动详情
    '/creditserver/coupon/list': '/couponList',                 // 卡券列表
    '/creditserver/coupon/detail': '/couponDetail',             // 卡券详情
    '/creditserver/personal/dynamic': '/personalDynamic',       // 获取个人动态
    '/creditserver/order/toast': '/orderToast',                 // 获取订单toast返回
    '/pyramid/api/eventupload': '/orderToast',                  // 埋点
    '/creditserver/topic/detail': '/topicDetail',               // 专题详情
    '/creditserver/store/list': '/storeList',                   // 优惠列表
    '/creditserver/city/list': '/cityList',                     // 城市列表
    '/creditserver/store/detail': '/storeDetail',               // 城市商户详情
    '/creditserver/event/upload': '/common',                    // 城市商户tab埋点
    '/creditserver/correction/list': '/correctionList',         // 商户详情纠错选项列表
    '/creditserver/bank/recocard': '/recocardList',             // 推卡位列表
    '/creditserver/bank/process': '/applyCardPlan',             // 申卡进度页
    '/creditserver/mate/list': '/bannerList',                   // banner图
    '/creditserver/card/recommend': '/recommendCard',           // 推荐卡
    '/creditserver/product/recommend': '/recommendLoan',        // 推荐产品
    '/creditserver/product/detail': '/productDetail',           // 产品详情
    '/creditserver/product/list': '/productList',               // 产品列表
    '/creditserver/product/jumpUrl': '/productJumpUrl'          // 获取产品跳转地址 - toast页面
};

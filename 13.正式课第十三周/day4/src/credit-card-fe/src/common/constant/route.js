/**
 * @file 路由
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2018/12/6
 */
export const firstRoute = 'bkrcredit'; // 线上一级路由
const transRoute = pageRoute => {
    return '/' + firstRoute + pageRoute;
};
export default {
    FIRST_ROUTE: firstRoute, // 路由前缀
    CREDIT_INDEX: transRoute(''),                       // 办卡首页
    CARD_LIST: transRoute('/cardList'),                 // 卡列表
    CARD_DETAIL: transRoute('/cardDetail'),             // 卡详情
    PERSONAL_CENTER: transRoute('/personalCenter'),     // 个人中心
    CONTRACT_DETAIL: transRoute('/contractDetail'),     // 用户须知
    STORE_LIST: transRoute('/storeList'),               // 优惠列表
    STORE_DETAIL: transRoute('/discountDetail'),        // 商户详情
    NEWS_LIST: transRoute('/knowledgeList'),            // 知识列表
    NEWS_DETAIL: transRoute('/newsDetail'),             // 知识详情页
    TELLIST: transRoute('/telList'),                    // 客服中心
    ORDER_LIST: transRoute('/orderList'),               // 订单列表
    ORDER_DETAIL: transRoute('/orderDetail'),           // 订单详情
    COUPON_LIST: transRoute('/couponList'),             // 有效卡券列表
    INCOUPON_LIST: transRoute('/invalidCouponList'),    // 无效卡券列表
    COUPON_DETAIL: transRoute('/couponDetail'),         // 卡券详情
    ACTIVITY_DETAIL: transRoute('/activityDetail'),     // 活动详情
    TOAST_PAGE: transRoute('/toastPage'),               // 跳转银行中间页
    TOPIC: transRoute('/topic')                         // 主题页
};

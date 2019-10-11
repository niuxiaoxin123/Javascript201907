/**
 * @file reducer
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */

import {combineReducers} from 'redux';
import telList from './pages/telList/reducer';
import cardList from './pages/cardList/reducer';
import creditIndex from './pages/creditIndex/reducer';
import knowledgeList from './pages/cardUseKnowledge/reducer';
import cardDetail from './pages/cardDetail/reducer';
import orderDetail from './pages/orderDetail/reducer';
import orderList from './pages/orderList/reducer';
import newsDetail from './pages/newsDetail/reducer';
import personalCenter from './pages/personalCenter/reducer';
import listCache from './pages/components/pager/reducer';
import activityDetail from './pages/activityDetail/reducer';
import couponList from './pages/couponList/reducer';
import invalidCouponList from './pages/invalidCouponList/reducer';
import couponDetail from './pages/couponDetail/reducer';
import commonState from './reducer';
import topicDetail from './pages/topic/reducer';
import storeList from './pages/storeList/reducer';
import discountDetail from './pages/store/discountDetail/reducer';
import cityData from './pages/components/citySelect/reducer';
import applyCardSchedule from './pages/applyCardSchedule/reducer';
import productDetail from './pages/productDetail/reducer';
import productListReducer from './pages/productList/reducer';
export default combineReducers({
    telList,
    cardList,
    creditIndex,
    orderDetail,
    knowledgeList,
    cardDetail,
    orderList,
    newsDetail,
    personalCenter,
    listCache,
    activityDetail,
    couponList,
    invalidCouponList,
    couponDetail,
    commonState,
    topicDetail,
    storeList,
    cityData,
    discountDetail,
    applyCardSchedule,
    productDetail,
    productListReducer
});

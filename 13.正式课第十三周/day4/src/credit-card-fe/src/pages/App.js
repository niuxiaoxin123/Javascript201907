/**
 * @file 程序主入口 js
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */

import React, {Component} from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {bdTj, bdTrackPageView} from '../common/js/bdTongji';
import hyphenate from '../common/js/hyphenate';
import EventUpload from '../common/js/eventUpload';
import Const from '../common/constant/const';
import {firstRoute} from '../common/constant/route';
// 本地联调时需要baiduid做加解密时打开这个即可
// document.cookie = 'BAIDUID=DFC48B4AE1B7EEA0ED50920549A97CCE:FG=1;path=/'
// 百度统计注入js文件
bdTj();
const notFound = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./404').default);
    }, 'NotFound');
};

const telList = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./telList').default);
    }, 'TelList');
};

const cardList = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./cardList').default);
    }, 'CardList');
};

const CreditIndex = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./creditIndex').default);
    }, 'CreditIndex');
};

const PersonalCenter = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./personalCenter').default);
    }, 'PersonalCenter');
};
const ContractDetail = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./contractDetail').default);
    }, 'ContractDetail');
};
const CardUseKnowledge = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./cardUseKnowledge').default);
    }, 'CardUseKnowledge');
};

const cardDetail = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./cardDetail').default);
    }, 'CardDetail');
};

const orderDetail = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./orderDetail').default);
    }, 'OrderDetail');
};

const orderList = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./orderList').default);
    }, 'OrderList');
};

const newsDetail = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./newsDetail').default);
    }, 'NewsDetail');
};

const couponList = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./couponList').default);
    }, 'CouponList');
};

const invalidCouponList = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./invalidCouponList').default);
    }, 'InvalidCouponList');
};

const couponDetail = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./couponDetail').default);
    }, 'CouponDetail');
};

const activityDetail = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./activityDetail').default);
    }, 'ActivityDetail');
};

const toastPage = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./toastPage').default);
    }, 'ToastPage');
};
// 主题推荐
const topic = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./topic').default);
    }, 'Topic');
};

// 优惠列表页
const storeList = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./storeList').default);
    }, 'StoreList');
};
// 优惠详情
const discountDetail = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./store/discountDetail').default);
    }, 'discountDetail');
};

// 申卡进度
const applyCardSchedule = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./applyCardSchedule').default);
    }, 'applyCardSchedule');
};
// 贷款not found 页面
const loanNotFound = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./loanNotFound').default);
    }, 'loanNotFound');
};

// 产品详情
const productDetail = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./productDetail').default);
    }, 'ProductDetail');
};

// 产品列表
const productList = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./productList').default);
    }, 'ProductList');
};
export default class App extends Component {
    componentDidMount() {
        window.addEventListener('online', this.reload, false);
    }
    componentWillUnmount() {
        window.removeEventListener('online', this.reload, false);
    }
    // 强制重刷页面
    reload = () => {
        window.location.reload(true);
    }
    routerUpdate = () => {
        // 埋点
        let pvRoute = Const.PV_TJ_ROUTE;
        let pathRoute = Const.PATH_ROUTE;
        let currentRoute = hyphenate.getLowerRoute();
        let needPvTj = pvRoute.indexOf(currentRoute) !== -1;
        let needPathTj = pathRoute.indexOf(currentRoute) !== -1;
        // 需要做pv统计
        if (needPvTj) {
            EventUpload.pvTj();
        }
        // 需要做用户行为轨迹统计
        if (needPathTj) {
            EventUpload.pvTj({
                path: hyphenate.ctPath(),
                module: hyphenate.getSearchString().module
            });
        }

        // 百度页面统计 -- test代码 如果数据准确再转为正式代码
        bdTrackPageView(location.pathname === '/' ? '/bkrcredit' : location.pathname);
        // 移除事件监听
        document.getElementById('root').removeEventListener('touchstart', this.touchStart, false);
        document.getElementById('root').removeEventListener('touchend', this.touchEnd, false);

        // 重新绑定事件
        this.startX = null;
        this.startY = null;
        // 手指接触屏幕
        document.getElementById('root').addEventListener('touchstart', this.touchStart, false);
        // 手指离开屏幕
        document.getElementById('root').addEventListener('touchend', this.touchEnd, false);
    }

    // touchStart
    touchStart = e => {
        this.startX = e.touches[0].pageX;
        this.startY = e.touches[0].pageY;
    }
    // touchEnd
    touchEnd = e => {
        let currentRoute = hyphenate.getLowerRoute();
        currentRoute === '/' && (currentRoute = 'creditindex');
        let endX = e.changedTouches[0].pageX || null;
        let endY = e.changedTouches[0].pageY || null;
        let direction = this.getDirection(this.startX, this.startY, endX, endY);
        switch (direction) {
            case 0:
                break;
            case 1:
                // alert(currentRoute + '上');
                global.bdTrackEvent(currentRoute + '_top');
                break;
            case 2:
                // alert(currentRoute + '下');
                global.bdTrackEvent(currentRoute + '_bottom');
                break;
            default:
        }
    }
    // 判断方向
    getDirection(startX, startY, endX, endY) {
        let angX = endX - startX;
        let angY = endY - startY;
        let result = 0;
        // 如果滑动距离太短
        if (Math.abs(angX) < 2 && Math.abs(angY) < 2) {
            return result;
        }
        // 获取角度
        let angle = Math.atan2(angY, angX) * 180 / Math.PI;
        if (angle > -180 && angle <= 0) {
            result = 1;
        }
        else if (angle > 0 && angle <= 180) {
            result = 2;
        }
        return result;
    }
    render() {
        return <Router history={browserHistory} onUpdate={this.routerUpdate}>
            <Router path="/">
                <IndexRoute getComponent={CreditIndex} />
                <Route path={firstRoute}>
                    <IndexRoute getComponent={CreditIndex} />
                    <Route path='telList' getComponent={telList}></Route>
                    <Route path='cardList' getComponent={cardList}></Route>
                    <Route path='cardDetail' getComponent={cardDetail}></Route>
                    <Route path='personalCenter' getComponent={PersonalCenter}></Route>
                    <Route path='contractDetail' getComponent={ContractDetail}></Route>
                    <Route path='orderDetail' getComponent={orderDetail}></Route>
                    <Route path='orderList' getComponent={orderList}></Route>
                    <Route path='knowledgeList' getComponent={CardUseKnowledge}></Route>
                    <Route path='newsDetail' getComponent={newsDetail}></Route>
                    <Route path='couponList' getComponent={couponList}></Route>
                    <Route path='invalidCouponList' getComponent={invalidCouponList}></Route>
                    <Route path='couponDetail' getComponent={couponDetail}></Route>
                    <Route path='activityDetail' getComponent={activityDetail}></Route>
                    <Route path='toastPage' getComponent={toastPage}></Route>
                    <Route path='topic' getComponent={topic}></Route>
                    <Route path='storeList' getComponent={storeList}></Route>
                    <Route path='discountDetail' getComponent={discountDetail}></Route>
                    <Route path='applyCardSchedule' getComponent={applyCardSchedule}></Route>
                    <Route path='loanNotFound' getComponent={loanNotFound}></Route>
                    <Route path='productDetail' getComponent={productDetail}></Route>
                    <Route path='productList' getComponent={productList}></Route>
                </Route>
            </Router>
            <Route path='*' getComponent={notFound}></Route>
        </Router>;
    }
}


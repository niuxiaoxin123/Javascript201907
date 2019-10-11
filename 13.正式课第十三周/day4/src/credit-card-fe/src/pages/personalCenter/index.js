/**
 * @file 程序主入口 js
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2017/6/15
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions';
import * as commonActions from '../../actions';
import * as couponListActions from '../couponList/actions';
import * as pagerActions from '../components/pager/actions';
import styles from './index.scss';
import TabBar from '../components/TabBar';
import Avatar from './imgs/avatar.png';

import {Link} from 'react-router';
import LogoutIcon from './imgs/logout.png';
import hyphenate from '../../common/js/hyphenate';
import SeverIcon from './imgs/service.png';
import OrderIcon from './imgs/order.png';
import CouponIcon from './imgs/coupon.png';
import ScheduleIcon from './imgs/Schedule.png';

class PersonalCenter extends Component {

    componentWillMount() {
        this.props.actions.fetch();
        window.isInWallet && this.props.commonActions.fetchPersonalDynamic();
        hyphenate.setDocumentTitle(window.isInWallet ? '申卡进度' : '个人中心');
        // 清除我的卡券列表数据缓存
        this.props.couponListActions.fetch({}, null, null, true);
        // 清楚我的卡券列表位置缓存
        this.props.pagerActions
        && this.props.pagerActions.listCache({
            couponListScrollTop: 0
        });

    }

    componentDidUpdate() {
        if (window.isInWallet) {
            let ele = document.createElement('script');
            ele.setAttribute('src', 'https://www.baifubao.com/static/agentjs/dist/1.0.2/agent.min.js');
            document.body.appendChild(ele);
        }
    }

    handleWalletLogin(e) {
        e.preventDefault();
        let href = location.href;
        href = href.replace(location.pathname, '/bkrcredit/orderList');
        window.Agent.login(href);
    }

    handleWalletCouponLogin(e) {
        e.preventDefault();
        let href = location.href;
        href = href.replace(location.pathname, '/bkrcredit/couponList');
        window.Agent.login(href);
    }

    // 组装loginUrl和参数
    transLogUrl = (baseUrl, routerPath) => {
        return baseUrl + encodeURIComponent(location.origin + routerPath) + hyphenate.encodeParams();
    }

    render() {
        let personalCenter = this.props.personalCenter;
        const endFetching = personalCenter.endFetching;
        personalCenter = personalCenter.data;
        let commonState = this.props.commonState;
        return (
            <div>
                <div>
                    {endFetching && <div className={styles.personalCenter}>
                        {!window.isInWallet && (personalCenter.isLogin
                            ? this.renderAva(personalCenter.portrait, personalCenter.userName)
                            : <a href={this.transLogUrl(personalCenter.loginUrl, '/bkrcredit/personalCenter')}
                                 onClick={window.isInWallet && this.handleWalletLogin}>
                                {this.renderAva(Avatar, '登录/注册')}
                            </a>)}
                        <div>
                            <ul className={styles.panel}>
                                <li className={styles.lineWrap} onClick={this.trackUpload.bind(this, 'order')}>
                                    {personalCenter.isLogin
                                    && <Link to={hyphenate.concatChnQuery('/bkrcredit/orderList')}>
                                        {this.renderContent(this.renderOrderIcon, '我的订单')}
                                    </Link>}
                                    {!personalCenter.isLogin
                                    && <a href={this.transLogUrl(personalCenter.loginUrl, '/bkrcredit/orderList')}
                                          onClick={window.isInWallet && this.handleWalletLogin}>
                                        {this.renderContent(this.renderOrderIcon, '我的订单')}
                                    </a>}
                                </li>
                                <li className={styles.lineWrap} onClick={this.trackUpload.bind(this, 'coupon')}>
                                    {personalCenter.isLogin
                                    && <Link to={hyphenate.concatChnQuery('/bkrcredit/couponList')}>
                                        {this.renderContent(this.renderCouponIcon, '我的卡券',
                                            commonState.endFetching
                                            && commonState.personalDynamic
                                            && commonState.personalDynamic.couponDynamic
                                            && commonState.personalDynamic.couponDynamic.total - 0 > 0)}
                                    </Link>}
                                    {!personalCenter.isLogin
                                    && <a href={this.transLogUrl(personalCenter.loginUrl, '/bkrcredit/couponList')}
                                          onClick={window.isInWallet && this.handleWalletCouponLogin}>
                                        {this.renderContent(this.renderCouponIcon, '我的卡券')}
                                    </a>}
                                </li>
                                <li className={styles.lineWrap}
                                    onClick={this.trackUpload.bind(this, 'applycardschedule')}>
                                    <Link to={hyphenate.concatChnQuery('/bkrcredit/applyCardSchedule')}>
                                        {this.renderContent(this.renderApplyIcon, '申卡进度')}
                                    </Link>
                                </li>
                                <li className={styles.lineWrap} onClick={this.trackUpload.bind(this, 'tellist')}>
                                    <Link to={hyphenate.concatChnQuery('/bkrcredit/telList')}>
                                        {this.renderContent(this.renderKefuIcon, '客服中心')}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        {/* {personalCenter.isLogin && !window.isInWallet && <div className={styles.panel}>
                            <div className={styles.lineWrap}>
                                <a href={this.transLogUrl(personalCenter.loginOutUrl, router.GET_CREDIT + '/personalCenter')}>
                                    {this.renderContent(this.renderOutIcon, '退出账户')}
                                </a>
                            </div>
                        </div>} */}
                    </div>}
                </div>
                {/* 用户须知 */}
                <h3 className={styles.footer}
                    onClick={this.trackUpload.bind(this, 'notice')}>
                    <Link to={hyphenate.concatChnQuery('/bkrcredit/contractDetail')}>
                        百度信用卡中心用户须知
                        <i className='iconfont'>&#xe630;</i>
                    </Link>
                </h3>

                {/* tab-bar部分 */}
                <TabBar/>
            </div>
        );
    }

    renderAva(Avatar, text) {
        return <div className={styles.avatar}>
            <img src={Avatar} alt='默认头像'/>
            <p>{text}</p>
        </div>;
    }

    renderContent(icon, name, hasNewCoupon) {
        return <div className={styles.line}>
            <div className={styles.alignCenter}>
                {icon()}
                <span>
                    {name}
                    {hasNewCoupon && <b className={styles.newCoupon}></b>}
                </span>
            </div>
            <div className={styles.font}>
                <i className='iconfont'>&#xe630;</i>
            </div>
        </div>;
    }

    renderOrderIcon() {
        return <img className={styles.centerIcon} src={OrderIcon}/>;
    }

    renderCouponIcon() {
        return <img className={styles.centerIcon} src={CouponIcon}/>;
    }
    renderKefuIcon() {
        return <img className={styles.centerIcon} src={SeverIcon}/>;
    }
    // 申卡进度Icon
    renderApplyIcon() {
        return <img className={styles.centerIcon} src={ScheduleIcon}/>;
    }

    renderOutIcon() {
        return <img className={styles.centerIcon} src={LogoutIcon}/>;
    }


    renderRecommendIcon() {
        return <i className={'iconfont ' + styles.telIcon}>&#xe8b0;</i>;
    }

    renderInvitationIcon() {
        return <i className={'iconfont ' + styles.telIcon}>&#xe6ac;</i>;
    }

    renderIcon() {
        return <i className={'iconfont ' + styles.telIcon}>&#xe61c;</i>;
    }

    // 加百度统计埋点
    trackUpload = trackIdCode => {
        global.bdTrackEvent('personalcenter_' + trackIdCode);
    }
}

const mapStateToProps = state => ({
    personalCenter: state.personalCenter,
    commonState: state.commonState
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
    commonActions: bindActionCreators(commonActions, dispatch),
    couponListActions: bindActionCreators(couponListActions, dispatch),
    pagerActions: bindActionCreators(pagerActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PersonalCenter);

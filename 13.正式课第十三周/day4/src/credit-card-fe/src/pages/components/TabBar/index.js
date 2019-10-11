/**
 * @file tabBar 组件 js
 * @author wyp
 * @date 2018/06/23
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import styles from './index.scss';
import hyphenate from '../../../common/js/hyphenate';
import * as actions from '../pager/actions';
import * as commonActions from './../../../actions';
import * as storeListActions from '../../storeList/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NewCouponImg from './imgs/newCoupon.png';
import {CONSTS} from '../../../common/constant';
class TabBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            href: ''
        };
    }
    componentDidMount() {
        this.props.commonActions.fetchPersonalDynamic();
    }
    render() {
        return (
            <div className={styles.centerNav}>
                <ul>
                    {this.renderTabBarList()}
                </ul>
            </div>
        );
    }
    renderTabBarList() {
        let commonState = this.props.commonState;
        let tabBarList = [
            {
                key: '',
                title: '办卡',
                icon: require('./imgs/nav-apply.png'),
                activeIcon: require('./imgs/nav-apply-active.png'),
                click: () => {
                    global.bdTrackEvent('tabbar_credit');
                }
            },
            {
                key: 'productList',
                title: '保险',
                icon: require('./imgs/nav-insurance.png'),
                activeIcon: require('./imgs/nav-insurance-active.png'),
                params: 'productType=BX',
                click: () => {
                    global.bdTrackEvent('tabbar_insurance');
                }
            },
            {
                key: 'storeList',
                title: '优惠',
                icon: require('./imgs/nav-discount.png'),
                activeIcon: require('./imgs/nav-discount-active.png'),
                click: () => {
                    global.bdTrackEvent('tabbar_store');
                }
            },
            {
                key: 'knowledgeList',
                title: '知识',
                icon: require('./imgs/nav-knowledge.png'),
                activeIcon: require('./imgs/nav-knowledge-active.png'),
                click: () => {
                    global.bdTrackEvent('tabbar_article');
                }
            }
        ];
        // mgm渠道不显示个人中心
        if (hyphenate.getSearchString().requestFrom !== 'mgm') {
            tabBarList.push({
                key: 'personalCenter',
                title: '个人中心',
                icon: require('./imgs/nav-center.png'),
                activeIcon: require('./imgs/nav-center-active.png'),
                showDynamic: commonState.endFetching
                    && commonState.personalDynamic
                    && commonState.personalDynamic.couponDynamic
                    && commonState.personalDynamic.couponDynamic.total - 0 > 0,
                click: () => {
                    global.bdTrackEvent('tabbar_my');
                }
            });
        }

        let pathname = location.pathname.split('/');
        let currentquery = pathname[pathname.length - 1];

        return tabBarList.map((item, index) => {
            let isCurrentQuery = currentquery === item.key;
            return (
                <li className={isCurrentQuery ? styles.active : ''}
                    key={index}
                    onClick={item.click}
                    style={{width: 100 / tabBarList.length + '%'}}>
                    <Link to={isCurrentQuery
                        ? ''
                        : hyphenate.concatChnQuery('/' + CONSTS.ROUTE.FIRST_ROUTE + '/' + item.key, item.params)}>
                        <img src={isCurrentQuery ? item.activeIcon : item.icon} />
                        <span>{item.title}</span>
                        {item.showDynamic && <div className={styles.newCoupon}>
                            <img src={NewCouponImg} alt='有新优惠券' />
                            <span>{commonState.personalDynamic
                                && commonState.personalDynamic.couponDynamic
                                && commonState.personalDynamic.couponDynamic.desc || '您有新动态'}</span>
                        </div>}
                    </Link>
                </li>
            );
        });
    }
}
const mapStateToProps = state => ({
    listCache: state.listCache,
    commonState: state.commonState
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
    storeListActions: bindActionCreators(storeListActions, dispatch),
    commonActions: bindActionCreators(commonActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TabBar);

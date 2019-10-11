/**
 * @file 用卡知识页面 js
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions';
import * as pagerActions from '../components/pager/actions';
import * as commonActions from '../../actions';
import * as invalidCouponListActions from '../invalidCouponList/actions';
import styles from './index.scss';
import Pager from '../components/pager';
import Header from '../components/header';
import {Link} from 'react-router';
import CouponItem from '../components/couponItem';
import {Loading} from '../components/tip';
import NoCouponImg from '../../common/imgs/noCoupon.png';
import RecommendList from '../components/RecommendList';
import hyphenate from '../../common/js/hyphenate';

const title = '我的卡券';

class CouponList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        hyphenate.setDocumentTitle(title);
        // 缓存
        let listCache = this.props.couponList && this.props.couponList.list;
        if (listCache && listCache.length > 0) {
            // 将缓存更新到redux
            this.props.actions.fetch({}, null, this.props.couponList);
        } else {
            // 重新请求数据
            this.props.actions.fetch();
        }

        // 清除失效卡券列表数据缓存和位置缓存
        this.props.invalidCouponListActions.fetch({}, null, null, true);
        this.props.pagerActions
            && this.props.pagerActions.listCache({
                invalidCouponListScrollTop: 0
            });

    }
    pagerHanderLoad = info => {
        let vm = this;
        let couponList = vm.props.couponList;
        vm.props.actions.fetch({
            pageNo: ++couponList.paginator.pageNo
        }, info);
    }
    itemClickHandle = (index, params) => {

        // 缓存位置和数据
        let couponList = this.props.couponList;
        couponList.list[index].deliverStatus = '1';
        this.props.pagerActions.listCache({
            couponListDataCache: JSON.stringify(couponList)
        });
    }

    render() {
        const couponList = this.props.couponList;
        return (
            <div className={styles.couponWrapper}>
                {!couponList.endFetching && <Loading />}
                {couponList.endFetching && <div>
                    {!window.isInWallet && <Header title={title} />}
                    {(couponList.list && couponList.list.length > 0)
                        ? <div className={styles.couponListPaper}>
                            <Pager
                                onLoad={this.pagerHanderLoad}
                                user='couponList'
                                firstPaginator={couponList.paginator}
                                footer={<div className={styles.footerHole}></div>}>
                                <div className={!window.isInWallet ? styles.walletHole : styles.hole}></div>
                                <ul className={styles.couponList + ' clearfix'}>
                                    {couponList.list && couponList.list.map((item, index) => (
                                        <CouponItem data={item} key={index} type='valid'
                                            dataIndex={index}
                                            itemClick={(index, params) =>
                                                this.itemClickHandle.bind(this, index, params)}
                                        />
                                    ))}
                                </ul>
                            </Pager>
                        </div>
                        : <div className={styles.noData + ' flex'}>
                            <div>
                                <img alt='暂无卡券，快去办卡吧' src={NoCouponImg} />
                                <p>暂无卡券, 快去办卡吧</p>
                                <RecommendList title='为您推荐'
                                    listData={couponList.currentRecommendList}
                                    className={styles.couponRecommend}
                                    code='creditcard_couponList_recommend' />
                            </div>
                        </div>}
                    <div className={styles.linkUs}>
                        <Link to={hyphenate.concatChnQuery('/bkrcredit/invalidCouponList')}
                            onClick={() => {global.bdTrackEvent('couponlist_invalid')}}>
                            查看已失效券
                            <i className='iconfont'>&#xe630;</i>
                        </Link>
                        <p>客服邮箱：xinyongka@baidu.com</p>
                    </div>
                </div>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    couponList: state.couponList,
    listCache: state.listCache
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
    pagerActions: bindActionCreators(pagerActions, dispatch),
    commonActions: bindActionCreators(commonActions, dispatch),
    invalidCouponListActions: bindActionCreators(invalidCouponListActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CouponList);

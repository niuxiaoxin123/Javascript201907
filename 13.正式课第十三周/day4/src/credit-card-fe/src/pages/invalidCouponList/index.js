/**
 * @file 用卡知识页面 js
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions';
import styles from './index.scss';
import Pager from '../components/pager';
import Header from '../components/header';
import {Link} from 'react-router';
import CouponItem from '../components/couponItem';
import {Loading} from '../components/tip';
import NoCouponImg from '../../common/imgs/noCoupon.png';
import hyphenate from '../../common/js/hyphenate';


const title = '已失效券';

class InvalidCouponList extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        hyphenate.setDocumentTitle(title);
        let listCache = this.props.invalidCouponList && this.props.invalidCouponList.list;
        if (listCache && listCache.length > 0) {
            // 将缓存更新到redux
            this.props.actions.fetch({}, null, this.props.invalidCouponList);
        } else {
            // 重新请求数据
            this.props.actions.fetch();
        }
    }
    pagerHanderLoad = info => {
        let vm = this;
        let invalidCouponList = vm.props.invalidCouponList;
        vm.props.actions.fetch({
            pageNo: ++invalidCouponList.paginator.pageNo
        }, info);
    }

    render() {
        const invalidCouponList = this.props.invalidCouponList;
        return (
            <div className={styles.couponWrapper}>
                {!invalidCouponList.endFetching && <Loading />}
                {invalidCouponList.endFetching && <div>
                    {!window.isInWallet && <Header title={title} />}
                    {(invalidCouponList.list && invalidCouponList.list.length > 0)
                        ? <div className={styles.couponListPaper}>
                            <Pager onLoad={this.pagerHanderLoad} user='invalidCouponList'
                                firstPaginator={invalidCouponList.paginator}>
                                <div className={!window.isInWallet ? styles.walletHole : styles.hole}></div>
                                <ul className={styles.couponList + ' clearfix'}>
                                    {invalidCouponList.list && invalidCouponList.list.map((item, index) => (
                                        <CouponItem
                                            data={item}
                                            key={index}
                                            type='invalid' />
                                    ))}
                                </ul>
                            </Pager>
                        </div>
                        : <div className={styles.noData + ' flex'}>
                            <div>
                                <img alt='暂无卡券' src={NoCouponImg} />
                                <p>暂无卡券</p>
                            </div>
                        </div>}
                </div>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    // commonState: state.commonState,
    invalidCouponList: state.invalidCouponList
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InvalidCouponList);

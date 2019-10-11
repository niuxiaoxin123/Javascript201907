/**
 * @file 程序主入口 js
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/28
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions';
// import * as couponListActions from '../couponList/actions';
// import * as pagerActions from '../components/pager/actions';
import styles from './index.scss';
import Header from '../components/header';
import RecommendList from '../components/RecommendList';
import {Loading} from '../components/tip';
import {Link} from 'react-router';
import CouponEntryImg from './imgs/entry.png';
import hyphenate from '../../common/js/hyphenate';

const title = '订单详情';

class OrderDetail extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.actions.fetch();
        hyphenate.setDocumentTitle(title);
    }
    componentWillUnmount() {
        // 清store中卡券详情的数据
        this.props.actions.fetch(true);
    }

    render() {
        const orderDetail = this.props.orderDetail;
        return (
            <div className={styles.wrapper}>
                {!orderDetail.endFetching && <Loading/>}
                {orderDetail.endFetching
                    && <div>
                        {!window.isInWallet && <Header title={title}/>}
                        {this.renderInfo()}
                        <RecommendList title='为您推荐'
                            listData={orderDetail.content.currentRecommendList}
                            className={styles.recommend}
                            code='orderdetail_recommend'/>
                    </div>}
            </div>
        );
    }

    getDotClass(index, status) {
        // 圆点有三种情况,成功、失败、holder
        if (!index) {
            return styles.pass;
        }

        if (typeof status === 'string') {
            status = Number(status);
        }

        switch (status) {
            case 1: // 确认意向
                return styles.holder;
                break;
            case 2: // 提交成功
                if (index === 1) {
                    return styles.pass;
                } else {
                    return styles.holder;
                }
            case 3: // 提交失败
                return styles.fail;
            case 4: // 审核成功
                if (index === 1 || index === 2) {
                    return styles.pass;
                } else {
                    return styles.holder;
                }
            case 5: // 审核失败
                if (index === 1) {
                    return styles.pass;
                } else {
                    return styles.fail;
                }
            case 6: // 激活成功
                return styles.pass;
            default:
        }
    }

    renderInfo() {
        const orderDetail = this.props.orderDetail;
        let {
            orderInfo,
            deliverInfo
        } = this.props.orderDetail.content;

        return (
            <div className={styles.info}>
                <div className={styles.header + ' ' + styles['header' + orderInfo.status]}>
                    <h5>{orderInfo.title}</h5>
                    <p>{orderInfo.desc}</p>
                    {/* 拿到详情数据显示礼券图标，valid=0代表卡券失效，img做滤镜处理 */}
                    {orderDetail.endFetching && deliverInfo
                        && <Link
                            className={styles.couponEntry}
                            to={hyphenate.concatChnQuery('/bkrcredit/couponDetail/?stockCode='
                                + deliverInfo.stockCode)}>
                            <img alt='领取礼券' src={CouponEntryImg}
                                className={deliverInfo.valid !== '1' ? styles.filter : ''} />
                        </Link>}
                </div>
                <div className={styles.progress}>
                    <h5>订单进度</h5>
                    <ul ref={el => {
                        el
                            && el.childNodes.length === 4
                            && el.insertBefore(document.createElement('li'), el.lastChild);
                    }}>
                        <i className={styles.line}><i className={styles['inline' + orderInfo.status]}></i></i>
                        {orderInfo.process.map((item, index) => {
                            return <li key={index} className={this.getDotClass(index, orderInfo.status)}>
                                <span className={styles.dotOuter}><i className={styles.dotInner}></i></span>
                                <p className={styles.name}>{item.name}</p>
                                {item.time && <p className={styles.time}>{item.time}</p>}
                            </li>;
                        })}
                    </ul>
                </div>
                <p className={styles.applytime}><span>订单时间</span>{orderInfo.createTime}</p>
                <p className={styles.applyNo}><span>订单编号</span>{orderInfo.orderNo}</p>
                {orderInfo.serviceTel
                    && <a href={'tel:' + orderInfo.serviceTel} className={styles.tel}>客服电话: {orderInfo.serviceTel}</a>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    orderDetail: state.orderDetail
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
    // couponListActions: bindActionCreators(couponListActions, dispatch),
    // pagerActions: bindActionCreators(pagerActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderDetail);

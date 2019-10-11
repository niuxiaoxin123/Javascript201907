/**
 * @file 程序主入口 js
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions';
import styles from './index.scss';
import Header from '../components/header';
import {Link} from 'react-router';
import {Loading} from '../components/tip';
import hyphenate from '../../common/js/hyphenate';

const title = '我的订单';

class OrderList extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.actions.fetch();
        hyphenate.setDocumentTitle(title);
    }

    render() {
        const orderList = this.props.orderList;

        return (
            <div className={styles.wrapper}>
                {!window.isInWallet && <Header title={title}/>}
                {!orderList.endFetching && <Loading/>}
                {orderList.endFetching
                    && <ul>
                        {orderList.cardList
                            && orderList.cardList.length
                            && orderList.cardList.map((item, index) => (
                                <li key={index} onClick={() => {global.bdTrackEvent('orderlist_order')}}>
                                    <Link to={hyphenate.concatChnQuery(item.url)}
                                        className={styles.item}>
                                        <img src={item.logoUrl} />
                                        <div className={styles.cardInfo}>
                                            <h5>{item.cardName}</h5>
                                            <p>订单日期：{item.createTime}</p>
                                        </div>
                                        <p className={styles.state}>{item.statue}</p>
                                    </Link>
                                </li>
                            )) || <li className={styles.noOrder}>
                                <div className={styles.imgWrap}>
                                    <p>暂未创建订单</p>
                                </div>
                            </li>}
                    </ul>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    orderList: state.orderList
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderList);

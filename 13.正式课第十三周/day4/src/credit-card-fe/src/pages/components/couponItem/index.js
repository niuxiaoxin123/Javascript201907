/**
 * @file 我的卡券 组件 js
 * @author wyp
 * @date 2018/06/23
 * 需要传入的属性 data = {item}
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import styles from './index.scss';
import hyphenate from '../../../common/js/hyphenate';
import NewImg from './imgs/new.png';
import PassImg from '../../../common/imgs/pass.png';

export default class CouponItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let couponItem = this.props.data;
        let {
            type,
            itemClick,
            dataIndex
        } = this.props;
        return (
            <Link
                to={hyphenate.concatChnQuery('/bkrcredit/couponDetail', couponItem.params)}
                onClick={itemClick && itemClick(dataIndex, couponItem.params)}>
                {type === 'valid' && <li className={styles.couponItem}>
                    <img src={couponItem.couponImage} />
                    <p>有效期: {couponItem.startDate} 至 {couponItem.endDate}</p>
                    {couponItem.deliverStatus === '0' && <img src={NewImg} alt='新' className={styles.new} />}
                </li>}
                {type === 'invalid' && <li className={styles.couponItem}>
                    <img src={couponItem.couponImage} className={styles.invalidImg}/>
                    <p>已于{couponItem.endDate}到期</p>
                    <img src={PassImg} alt='已过期' className={styles.pass}/>
                </li>}
            </Link>
        );
    }
}

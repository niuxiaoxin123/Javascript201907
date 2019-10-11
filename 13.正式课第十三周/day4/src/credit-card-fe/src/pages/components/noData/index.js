/**
 * @file 空数据 组件
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2019/6/5
 * @param {String} image 空数据图片链接 不传则用默认图
 * @param {String} title 空数据文字提示 不传则用默认提示
 */
import React, {Component} from 'react';
import styles from './index.scss';
import NoCouponImg from '../../../common/imgs/noCoupon.png';

export default props => <div className={styles.noData + ' flex'}>
    <div>
        <img alt='空数据图片' src={props.image || NoCouponImg} />
        <p>{props.title || '暂无数据'}</p>
    </div>
</div>;
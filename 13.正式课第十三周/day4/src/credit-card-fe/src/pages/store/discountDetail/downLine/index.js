/**
 * @file header js
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */
import React, {Component} from 'react';
import styles from './index.scss';
import downLine from '../../../../common/imgs/downline.png';

export default function DownLine(props) {
    return (
        <div className={styles.downLinePage}>
            <div className={styles.downLineCard}>
                <img src={downLine} />
                <p>{props.title}</p>
            </div>
        </div>
    );
};
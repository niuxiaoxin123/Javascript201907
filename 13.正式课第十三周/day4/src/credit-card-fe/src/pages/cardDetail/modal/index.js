/**
 * @file 弹窗
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2019-1-17
 */
import React, {Component} from 'react';
import styles from '../index.scss';

export default props => {
    return (
        <div className={styles.modal + ' ' + props.class}>
            <div className={styles.modalContainer}>
                <div className={styles.modalContent}>
                    <div className={styles.head}>
                        <span>{props.title}</span>
                    </div>
                    <div className={styles.content}>
                        {props.children}
                    </div>
                </div>
                <div className={styles.footers}>
                    <span>
                        <i onClick={props.close}
                            className={'iconfont' + ' ' + styles.arrowheadDown}>&#xe605;</i>
                    </span>
                </div>
            </div>
        </div>
    );
};
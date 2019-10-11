/**
 * @file 标记 -- 如：更多>
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2018/11/17
 */
import React, {Component} from 'react';
import styles from './index.scss';

export default props => {
    return (
        <div className={`${styles.mark} ${props.className}`}>
            <span className={styles.markTitle}>{props.title || '更多'}</span><i className='iconfont'>&#xe630;</i>
        </div>
    );
};
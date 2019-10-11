/**
 * @file 收起-展开 组件
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2018/11/21
 */
import React, {Component} from 'react';
import styles from './index.scss';

export default props => {
    return (
        <div className={`${styles.spread} ${props.show ? styles.liner : ''}`}>
            {props.show
                && <h5
                    id={props.idCode + '_showmore'}
                    className={styles.down}
                    onClick={props.showHandle}>展开更多 <i className='iconfont'>&#xe636;</i>
                </h5>}
            {props.hide
                && <h5
                    id={props.idCode + '_hidemore'}
                    className={styles.up}
                    onClick={props.hideHandle}>收起更多 <i className='iconfont'>&#xe635;</i>
                </h5>}
        </div>
    );
};
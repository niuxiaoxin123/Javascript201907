/**
 * @file header js
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */
import React, {Component} from 'react';
import styles from './index.scss';

export default function Header(props) {
    const back = () => {
        history.back();
    };
    return (
        <div className={styles.header + ' ' + props.classname}
            ref={header => props.getRef && props.getRef(header)}>
            {!props.noIcon && <i className={'iconfont' + ' ' + styles.back}
                onClick={props.back || back}>&#xe641;</i>}
            <span>{props.title}</span>
            {props.children}
        </div>
    );
}
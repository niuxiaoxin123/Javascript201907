/**
 * @file 标题栏-信用卡中心|优惠尽享
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2018/10/31
 */
import React, {Component} from 'react';
import styles from './index.scss';
import ZPBug from './imgs/ZPBug.png';

export default function TitleBar(props) {
    return (
        <div className={`${styles.navBrowser} ${props.fixedTop ? styles.fixedTop : ''}
         ${props.noColor ? styles.noColor : ''}`}>
            {!props.isZPBug ? <div className={styles.navSlogan}>
                <span>百度信用卡中心</span>
                <span>快速申卡 优惠尽享</span>
            </div> : <img src={ZPBug} className={styles.zpBugImg}/>}
            {props.children}
        </div>
    );
};
/**
 * @file 模块标题
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2019/5/30
 */
import React, {Component} from 'react';
import styles from '../index.scss';

export default function ModuleTitle(props) {
    return <p className={styles.moduleTitle}>{props.title || '模块标题'}</p>;
};
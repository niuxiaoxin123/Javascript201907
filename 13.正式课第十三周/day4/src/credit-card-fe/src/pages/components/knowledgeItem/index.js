/**
 * @file 用卡知识 组件 js
 * @author wyp
 * @date 2018/06/23
 * 需要传入的属性 data = {item}
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import styles from './index.scss';
import hyphenate from '../../../common/js/hyphenate';

export default class KnowledgeItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                {this.renderItem()}
            </div>
        );
    }
    // 渲染用卡知识项目部分
    renderItem() {
        let item = this.props.data;
        if (item.thumbnail && item.thumbnail.length === 3) {
            return (
                <li className={styles.thirdPart + ' ' + styles.knowlgItem}
                    onClick={() => {global.bdTrackEvent('knowledgelist_knowledge');}}>
                    <Link to={hyphenate.concatChnQuery('/bkrcredit/newsDetail', item.params)}>
                        <h2>{item.title}</h2>
                        <div className={styles.thirdPartImgList + ' flex ' + styles.justiBtw}>
                            {item.thumbnail.map((imgItem, imgIndex) => (
                                <img src={imgItem} alt='图片' key={imgIndex} />
                            ))}
                        </div>
                        <p>{item.modifyTime}</p>
                    </Link>
                </li>
            );
        } else if (item.thumbnail && item.thumbnail.length === 1) {
            return (
                <li className={styles.oneImgPart + ' ' + styles.knowlgItem}>
                    <Link to={hyphenate.concatChnQuery('/bkrcredit/newsDetail', item.params)}
                        className={'flex ' + styles.justiBtw}>
                        <div className={styles.oneImgPartDesc}>
                            <h2>{item.title}</h2>
                            <p>{item.modifyTime}</p>
                        </div>
                        {item.thumbnail.map((imgItem, imgIndex) => (
                            <img src={imgItem} alt='图片' key={imgIndex}/>
                        ))}
                    </Link>
                </li>
            );
        } else {
            return (
                <li className={styles.noImgPart + ' ' + styles.knowlgItem}>
                    <Link to={hyphenate.concatChnQuery('/bkrcredit/newsDetail', item.params)}>
                        <h2>{item.title}</h2>
                        <p>{item.modifyTime}</p>
                    </Link>
                </li>
            );
        }
    }
}

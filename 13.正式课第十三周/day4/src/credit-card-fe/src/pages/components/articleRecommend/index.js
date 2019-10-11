/**
 * @file 文章底部推荐卡样式 js
 * @author v_wangyaping@baidu.com
 * @date 2018/10/12
 */

import React, {Component} from 'react';
import styles from './index.scss';
import hyphenate from '../../../common/js/hyphenate';

export default class TopicRecommend extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {title, listData, className, code, query} = this.props;
        return (
            <div className={styles.articleRecommend}>
                {listData && listData.length > 0 && <h2>极速办卡</h2>}
                <ul className={styles.listWrapper}>
                    {listData.map((item, index) => (
                        <li key={index}>
                            <a href={hyphenate.concatChnQuery('/creditserver/apply/redirect', item.url)}>
                                <img src={item.image} />
                                <div className={styles.detailWrapper}>
                                    <h5>{item.name}</h5>
                                    <p className={styles.detail}>{item.detail}</p>
                                    <p className={styles.info}>{item.applyNum}</p>
                                </div>
                                <p className={styles.apply}>详情</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
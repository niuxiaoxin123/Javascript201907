/**
 * @file 主题推荐卡 js
 * @author v_wangyaping@baidu.com
 * @date 2018/10/9
 */

import React, {Component} from 'react';
import styles from './index.scss';
import hyphenate from '../../../common/js/hyphenate';

export default class TopicRecommend extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {title = '为您推荐', listData, className, code, query} = this.props;
        return (
            <div className={styles.topicRecommend}>
                {listData && listData.length > 0 && <h2>{title}</h2>}
                <ul className={styles.listWrapper}>
                    {listData.map((item, index) => (
                        <li key={index}
                            onClick={() => {global.bdTrackEvent(code + '_' + (index + 1))}}>
                            <a href={hyphenate.concatChnQuery(item.url)}>
                                <img src={item.logoUrl} />
                                <div className={styles.detailWrapper}>
                                    <h5>{item.cardName}</h5>
                                    <p className={styles.detail}>{item.rightsList[0].rightsDesc}</p>
                                    {item.keywords
                                        && item.keywords.length > 0
                                        && <p className={styles.keywordsW}>
                                            {item.keywords.map((item, index) =>
                                                <span key={index} className={styles.keywordsItem}>{item}</span>)}
                                        </p>}
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
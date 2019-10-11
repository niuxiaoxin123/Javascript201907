/**
 * @file 本期力荐卡组件 js
 * @author wyp
 * @date 2018/06/23
 */

import React, {Component} from 'react';
import styles from './index.scss';
// import {Link} from 'react-router';
import hyphenate from '../../../common/js/hyphenate';


export default class RecommendList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {title, listData, className, code, query} = this.props;
        return (
            <div className={listData && listData.length > 0
                ? styles.recommendList + ' ' + className : ''}>
                <h2>{listData && listData.length > 0 && title}</h2>
                <ul className={styles.cardsList + ' ' + styles.flex}>
                    {listData && listData.length > 0 && listData.slice(0, 3).map((item, index) => {
                        // if (!item.bgColor) {
                        //     item.bgColor = '2F2F2F|686869';
                        // }
                        // let bgColorArr = item.bgColor.split('|');
                        return (
                            <a href={hyphenate.concatChnQuery(item.url, query || '')}
                                key={index}
                                onClick={() => {global.bdTrackEvent(code + '_' + (index + 1));}} >
                                <li>
                                    <img src={item.cardLogo} alt={item.cardModelName || item.cardName} />
                                    <div className={styles.cardDesc}>
                                        <h3>{item.cardModelName || item.cardName}</h3>
                                        <p>{item.title}</p>
                                    </div>
                                </li>
                            </a>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
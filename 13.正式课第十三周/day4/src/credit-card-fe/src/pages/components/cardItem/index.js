/**
 * @file 每张卡 js
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2018/9/12
 */
import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import styles from './index.scss';
import ActivityImg from './activity.png';
import hyphenate from '../../../common/js/hyphenate';
export default class CardItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {
            itemData,
            classname,
            logoKey
        } = this.props;
        return (
            <li className={styles.cardItem + ' ' + classname}
                onClick={this.cardClick}>
                <div className={styles.cardImg}>
                    <img src={logoKey ? itemData[logoKey] : (itemData.logoUrl)}
                        className={styles.cardLogo}
                        alt='图片' />
                    {itemData.activityTag
                        && <div className={styles.activityWrapper}>
                            <img src={ActivityImg} className={styles.activityLogo} alt='特惠' />
                            <span className={styles.tag}>{itemData.activityTag}</span>
                        </div>}
                </div>
                <div className={styles.cardTxt + ' clearfix'}>
                    <h5 className={styles.interestsTitle}>
                        {itemData.cardName}
                    </h5>
                    {itemData.rightsList
                        && itemData.rightsList.length > 0
                        && <p className={styles.highLight}>
                            {itemData.rightsList[0].rightsDesc}
                        </p>}
                    {itemData.keywords
                        && itemData.keywords.length > 0
                        && <div className={styles.keywordsW}>
                            {itemData.keywords.map((item, index) =>
                                <span key={index} className={styles.keywordsItem}>{item}</span>)}
                        </div>}
                </div>
            </li>
        );
    }
    // 卡片点击事件
    cardClick = () => {
        let vm = this;
        let {
            trackIdCode,
            clickHandle
        } = vm.props;
        // 百度统计埋点
        global.bdTrackEvent(trackIdCode || 'carditem');
        // 支持自定义点击事件
        if (clickHandle) {
            clickHandle();
            setTimeout(() => {
                vm.jump();
            }, 200);
            return;
        }
        vm.jump();
    }
    // 跳转页面
    jump = () => {
        let {
            itemData,
            query
        } = this.props;
        let cardCode = itemData.url.split('?')[1];
        let params = cardCode + '&' + query;
        console.log('bkrcredit/cardDetail?' +  params)
        browserHistory.push('bkrcredit/cardDetail?' +  params);
        // window.location.href = hyphenate.concatChnQuery(itemData.url, query || '');
    }
}
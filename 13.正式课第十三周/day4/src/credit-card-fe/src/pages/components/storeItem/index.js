/**
 * @file 商户列表 组件 js
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2018/10-25
 */
import React, { Component } from 'react';
import styles from './index.scss';
import hyphenate from '../../../common/js/hyphenate';
import { Link } from 'react-router';
import storeLogo from '../../../common/imgs/storeLogo.png';
import Mark from '../mark';
export default class StoreItem extends Component {
    constructor(props) {
        super(props);
        this.bankCode = '';
    }
    componentWillMount() {
        this.bankCode = hyphenate.getSearchString().bankCode;
    }
    // 监听图片加载失败
    imgError = e => {
        e.currentTarget.src = storeLogo;
    }
    render() {
        let {
            itemData,
            query,
            mapAccuracy,
            trackIdCode
        } = this.props;
        return (
            <Link to={hyphenate.concatChnQuery(itemData.jumpUrl, this.bankCode ? ('bankCode=' + this.bankCode) : '')}
                onClick={() => {global.bdTrackEvent(trackIdCode)}}>
                <li className={styles.storeItem + ' clearfix'}>
                    <div className={styles.storeImg + ' fl'}>
                        <img src={itemData.storePic} alt='图片' onError={this.imgError} />
                    </div>
                    <div className={styles.storeTxt + ' clearfix fl'}>
                        <h5>{itemData.storeName}</h5>
                        {itemData.offer
                            && itemData.offer.length > 0
                            && itemData.offer.slice(0, 3).map((item, index) => {
                                if (item.bank && item.title) {
                                    return <p key={index}>
                                        <i style={{'background': item.bgColor || '#3980FE'}}>{item.bank}</i>&nbsp;
                                        <span>{item.title}</span>
                                    </p>
                                }
                            })}
                    </div>
                    {/* 如果为模糊定位则不展示距离 */}
                    {itemData.distance && mapAccuracy !== null
                        && <div className={styles.distance}>{itemData.distance}</div>}
                    {itemData.offer
                        && itemData.offer.length > 3
                        && <Mark title='更多' className={styles.moreOffer} />}
                </li>
            </Link>
        );
    }
}
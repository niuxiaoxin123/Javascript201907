/**
 * @file 产品单项
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2019/5/30
 */
import React, {Component} from 'react';
import styles from '../index.scss';
import hyphenate from '../../../common/js/hyphenate';

export default function ProductItem(props) {
    let detail = props.productDetail;
    let itemClick = () => {
        global.eventUpload.eventTj({
            btnId: 'credit_productlist_insurance',
            pdtid: detail.productId
        });
        setTimeout(() => {
            let url = hyphenate.concatChnQuery(detail.url);
            if (detail.jumpType === 'detail') {
                window.location.href = url;
            } else {
                props.commonActions.fetchProductApply(hyphenate.getSearchString({
                    initStr: url
                }));
            }
        }, 200);
    };
    return <a className={styles.productItem} onClick={itemClick}>
        <div className={styles.productDesc + ' clearfix'}>
            <div className={styles.productLogo}>
                <img src={detail.productLogo} />
            </div>
            <div className={styles.detailWrapper}>
                <h5>{detail.productName}<span className={styles.keyword}>{detail.keyword}</span></h5>
                <ul>
                    {detail.desc.map((item, index) =>
                        <li key={index}><i className='iconfont'>&#xe63f;</i><p>{item}</p></li>)}
                </ul>
            </div>
            <img className={styles.acceptLogo} src={detail.acceptInsuranceOrgLogo} />
        </div>
        <div className={styles.costPart}>
            期限:{detail.period}&nbsp;&nbsp;&nbsp;
            最高保额:{detail.maxAmount}
            <span className='fr'>年保费:<i>¥{detail.minYearInsurance}</i>起</span>
        </div>
    </a>;
};
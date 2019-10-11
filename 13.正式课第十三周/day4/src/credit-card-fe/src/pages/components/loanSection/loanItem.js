/**
 * @file 贷款广告item组件
 * @author xiangjian(xiangjian@baidu.com)
 * @date 2019/03/28
 */
import React from 'react';
import styles from './index.scss';
import hyphenate from '../../../common/js/hyphenate';

let pageName = '';

export default function LoanItem(props) {
    let {
        loanItem,
        trackIdCode
    } = props;
    pageName = props.pageName;

    return (
        <li className={styles.cardItem + ' clearfix ' + trackIdCode}
            onClick={() => {
                global.bdTrackEvent(trackIdCode);
            }}>
            <section onClick={clickLoanItem.bind(this, loanItem, props)}>
                <div className={styles.cardImg}>
                    <img src={loanItem.organizationLogo}
                        className={styles.cardLogo}
                        onError={handleImgError.bind(this, loanItem.productId)}
                        alt='图片'/>
                </div>
                <div className={styles.cardTxt + ' clearfix'}>
                    <div className={styles.cardHeader}>
                        <h5 className={styles.title}>
                            {loanItem.organization + '-' + loanItem.productName}
                        </h5>
                        {loanItem.keywords
                            && loanItem.keywords.length > 0
                            && <p className={styles.keywords}>
                                {loanItem.keywords.map((item, index) =>
                                    <span key={index} className={styles.keywordsItem}>{item}</span>)}
                            </p>}
                    </div>
                    <div>
                        <div className={styles.cardContentLeft}>
                            <p className={styles.itemDesc}>{loanItem.desc}</p>
                            <p className={styles.itemLimit}>参考额度
                                <span>
                                    {loanItem.minAmount}元
                                    {loanItem.minAmount !== loanItem.maxAmount && '-' + loanItem.maxAmount + '元'}
                                </span>
                            </p>
                        </div>
                        <div className={styles.cardContentRight}>
                            <p>{calUnit(loanItem.interestUnit)}
                                <span className={styles.loanRate}>{loanItem.minInterest}</span>起</p>
                        </div>
                    </div>
                </div>
            </section>
        </li>
    );

}

function clickLoanItem(loanItem, props) {
    let {
        jumpType,
        url,
        productId
    } = loanItem;
    global.eventUpload.eventTj({
        btnId: 'creditcard_' + pageName + '_loan',
        loanItemId: productId
    });
    setTimeout(() => {
        let href = hyphenate.concatChnQuery(url || '');
        if (jumpType === 'detail') {
            window.location.href = href;
        } else {
            props.commonActions.fetchProductApply(hyphenate.getSearchString({
                initStr: href
            }));
        }
    }, 100);
}


function calUnit(type) {
    let unitMap = {
        year: '年利率',
        month: '月利率',
        week: '周利率',
        day: '日利率'
    };
    return unitMap[type];

}

// 处理图片加载错误，后面统一处理
function handleImgError(productId, event) {
    console.log('loan item image load error');
}

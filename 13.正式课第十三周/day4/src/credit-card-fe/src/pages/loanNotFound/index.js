/**
 * @file 404
 * @author xiangjian(xiangjian@baidu.com)
 * @date 2019/4/2
 */
import React from 'react';
import Header from '../components/header';
import styles from './index.scss';
import hyphenate from '../../common/js/hyphenate';
import loanNotFoundImg from './loanNotFound.png';

hyphenate.setDocumentTitle('404');

export default function LoanNotFound() {
    let headerTitle = '详情页';
    return (
        <div className={styles.notfoundpage}>
            {!(window.isInWallet || window.isBDMap)
            && <Header title={headerTitle}/>}
            <div className={styles.notfoundcard}>
                <h3>
                    <span><img src={loanNotFoundImg}/></span>
                    <p>系统异常，请选择其他产品</p>
                </h3>
            </div>
        </div>
    );
}

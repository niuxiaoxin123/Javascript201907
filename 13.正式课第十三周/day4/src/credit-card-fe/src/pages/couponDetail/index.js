/**
 * @file 程序主入口 js
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/27
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions';
import styles from './index.scss';
import Header from '../components/header';
import {Loading,success} from '../components/tip';
import CopyToClipboard from 'react-copy-to-clipboard';
import PassImg from '../../common/imgs/pass.png';
import hyphenate from '../../common/js/hyphenate';

const title = '卡券详情';

class CouponDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toastShow: false
        };
    }

    componentWillMount() {
        this.props.actions.fetch();
        hyphenate.setDocumentTitle(title);
    }
    componentWillUnmount() {
        this.props.actions.fetch(true);
    }

    onCopy(valid) {
        global.bdTrackEvent('coupondetail_copy');
        if (valid === '1') {
            success('复制成功');
        } else {
            return false;
        }
    }

    render() {
        const couponDetail = this.props.couponDetail;
        let validOrInvalidClass = '';
        let titleClass = '';
        let valid = null;
        if (couponDetail.endFetching && couponDetail.content) {
            validOrInvalidClass = couponDetail.content.valid === '1' ? styles.validTitle : styles.invalidTitle;
            titleClass = `${styles.title} ${validOrInvalidClass}`;
            valid = couponDetail.content.valid === '1';
        }
        return (
            <div className={styles.activityDetail}>
                {!couponDetail.endFetching && <Loading />}
                {couponDetail.endFetching
                    && couponDetail.content
                    && <div className={styles.detailContent}>
                        {!window.isInWallet && <Header title={title} />}
                        <div className={styles.detailWrapper}>
                            {!window.isInWallet && <div className={styles.walletHole}></div>}
                            <div className={styles.couponLogo}>
                                <img alt='卡券logo'
                                    className={!valid && styles.invalidImg}
                                    src={couponDetail.content.couponImage2} />
                                {!valid && <img src={PassImg} alt='已过期' className={styles.pass} />}
                            </div>
                            <ul className={styles.detailList}>
                                <li>
                                    <h4 className={titleClass}>有效期</h4>
                                    <p>{couponDetail.content.startDate} 至 {couponDetail.content.endDate}</p>
                                </li>
                                <li>
                                    <h4 className={titleClass}>发放内容</h4>
                                    <table className={styles.grantContent}>
                                        <thead></thead>
                                        <tbody>
                                            {couponDetail.content.grantContent
                                                && couponDetail.content.grantContent.map((item, index) =>
                                                    <tr key={index}>
                                                        <td className={styles.label} >{item.label}:&nbsp;</td>
                                                        <td className={styles.text}>{item.text}</td>
                                                        <td>
                                                            <CopyToClipboard
                                                                text={valid ? item.text : null}
                                                                onCopy={this.onCopy.bind(this, couponDetail.content.valid)}>
                                                                <span className={`${styles.copy} ${valid ? '' : styles.disabled}`}>
                                                                    复制
                                                                </span>
                                                            </CopyToClipboard>
                                                        </td>
                                                    </tr>
                                                )}
                                        </tbody>
                                        <tfoot></tfoot>
                                    </table>

                                </li>
                                {couponDetail.content.couponContent && <li>
                                    <h4 className={titleClass}>使用细则</h4>
                                    <div className={styles.useRules} dangerouslySetInnerHTML={{
                                        __html: couponDetail.content.couponContent
                                    }}>
                                    </div>
                                </li>}
                            </ul>
                        </div>
                    </div>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    couponDetail: state.couponDetail
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CouponDetail);

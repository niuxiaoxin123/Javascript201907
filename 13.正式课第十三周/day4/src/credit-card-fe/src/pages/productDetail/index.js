/**
 * @file 产品详情
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2019/4/29
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions';
import * as commonActions from '../../actions';
import styles from './index.scss';
import Header from '../components/header';
import {Loading} from '../components/tip';
import hyphenate from '../../common/js/hyphenate';
// import {Link, browserHistory} from 'react-router';
import arrowImg3 from './imgs/rightArrow3.png';
import arrowImg4 from './imgs/rightArrow4.png';
import LoanSection from '../components/loanSection';
import Product404 from '../loanNotFound';
import RecommendTitle from '../components/recommendTitle';

const title = '贷款详情';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.actions.fetch({}, res => {
            // 获取推荐产品
            this.props.commonActions.fetchProductRecommend({
                productType: 'XD'
            });
        });
        hyphenate.setDocumentTitle(title);
        window.scrollTo(0, 0);
    }

    render() {
        const productDetail = this.props.productDetail;
        let recommendLoan = this.props.commonState.recommendLoan;
        let productDetailContent = productDetail && productDetail.content;

        return (
            productDetail.endFetching && <div className={styles.productDetail}>
                {!(window.isInWallet || window.isBDMap)
                    && <Header title={title} />}
                {productDetailContent
                    ? <div className={styles.onlinePage}>
                        {/* 详情 */}
                        <div className={styles.detailWrapper}>
                            <div className={styles.baseInfoContainer + ' clearfix'}>
                                <div className={styles.bankLogo + ' fl'}>
                                    <img src={productDetailContent.bankLogo} />
                                </div>
                                <div className={
                                    styles.baseInfo + ' fl '
                                    + (productDetailContent.bankNameCh.length + productDetailContent.productName.length > 11
                                        ? styles.miniTitle
                                        : '')}>
                                    <h3>
                                        {productDetailContent.bankNameCh.slice(0, 8)}-{productDetailContent.productName}
                                        {productDetailContent.bankNameCh.length + productDetailContent.productName.length < 13 && <span>{productDetailContent.loanCategory.slice(0, 3)}</span>}
                                    </h3>
                                    <h5>{productDetailContent.desc}</h5>
                                    <p>
                                        {productDetailContent.keyword.map((item, index) =>
                                            <span key={index}>{item}</span>)}
                                    </p>
                                </div>
                                {/* 活动标签本期不显示 */}
                                {/* <div className={styles.activity}>
                                    <i></i>
                                    <span>送礼券</span>
                                </div> */}
                            </div>
                            <div className={styles.productPropsContainer}>
                                <ul className={'clearfix ' + styles.props1}>
                                    <li><h4>额度</h4>
                                        <p>
                                            {productDetailContent.minAmount}
                                            {productDetailContent.minAmount !== productDetailContent.maxAmount
                                                && '-' + productDetailContent.maxAmount}
                                            元</p>
                                    </li>
                                    <li><h4>期限</h4><p>{productDetailContent.period}</p></li>
                                    <li><h4>{this.calUnit(productDetailContent.interest.unit)}利率</h4>
                                        <p>
                                            {productDetailContent.interest.min}
                                            {productDetailContent.interest.min !== productDetailContent.interest.max
                                                && '-' + productDetailContent.interest.max}</p>
                                    </li>
                                </ul>
                                <ul className={'clearfix ' + styles.props2}>
                                    <li><h4>{this.calUnit(productDetailContent.fee.unit)}手续费用</h4>
                                        <p>{productDetailContent.fee.value}</p>
                                    </li>
                                    <li> </li>
                                    <li><h4>一次性费用</h4><p>{productDetailContent.onetimeCharge}</p></li>
                                </ul>
                                <div className={styles.extraProps + ' clearfix'}>
                                    <p>{productDetailContent.loanRealTime}</p>
                                    <p>{productDetailContent.mortgage}</p>
                                </div>
                            </div>
                            <div className={styles.applyProcess}>
                                <RecommendTitle title='申请流程' />
                                <ul className={styles.processList}>
                                    {productDetailContent.applyProcess.map((item, index) =>
                                        <li style={{width: (1 / productDetailContent.applyProcess.length) * 100 + '%'}}>
                                            <img src={item.icon} alt='' />
                                            <p>{item.title}</p>
                                            {index + 1 < productDetailContent.applyProcess.length
                                                && <img className={styles.arrowImg}
                                                    src={productDetailContent.applyProcess.length === 4 && arrowImg4 || arrowImg3} />}
                                        </li>)}
                                </ul>
                            </div>
                            <div className={styles.applyCondition}>
                                <RecommendTitle title='申请条件' />
                                <ul className={styles.conditionList}>
                                    {productDetailContent.applyCondition.map((item, index) =>
                                        <li>{item}</li>)}
                                </ul>
                            </div>
                            <div className={styles.provideMaterial}>
                                <RecommendTitle title='需提交的材料' />
                                <p>{productDetailContent.provideMaterial}</p>
                            </div>
                            {recommendLoan.endFetching
                                && <LoanSection loanList={recommendLoan.loanList}
                                    pageName='productDetail'
                                    title='猜你喜欢' />}
                        </div>

                        {/* 免费申请 */}
                        <a className={styles.apply}
                            onClick={this.applyBtnClick.bind(this, productDetailContent.applyUrl)}>
                            免费申请
                        </a>
                    </div>
                    : <Product404 />}
            </div> || <Loading />);
    }
    // 上报百度统计分析埋点
    // trackUpload = trackId => {
    //     global.bdTrackEvent('productdetail_' + trackId);
    // }
    // 免费申请按钮点击埋点
    applyBtnClick = applyUrl => {
        global.eventUpload.eventTj({
            btnId: 'credit_productdetail_apply'
        });
        let vm = this;
        setTimeout(() => {
            vm.props.commonActions.fetchProductApply(hyphenate.getSearchString({
                initStr: hyphenate.concatChnQuery(applyUrl)
            }));
        }, 100);
    }
    // 利率单位换算
    calUnit = type => {
        let unitMap = {
            year: '年',
            month: '月',
            week: '周',
            day: '日'
        };
        return unitMap[type];
    }
}

const mapStateToProps = state => ({
    productDetail: state.productDetail,
    commonState: state.commonState
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
    commonActions: bindActionCreators(commonActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductDetail);
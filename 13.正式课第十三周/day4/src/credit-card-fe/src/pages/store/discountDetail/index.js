/**
 * @file 优惠详情 js
 * @author v_zhangxiaoran(v_zhangxiaoran@baidu.com)
 * @date 2018/10/29
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions';
import * as commonActions from '../../../actions';
import * as pagerActions from '../../components/pager/actions';
import * as cardListActions from '../../cardList/actions';
import styles from './index.scss';
import Header from '../../components/header';
import hyphenate from '../../../common/js/hyphenate';
import DiscountInformation from './discountInformation/index';
// import EventUpload from '../../../common/js/eventUpload';
import pick from 'lodash/pick';
import storeLogo from '../../../common/imgs/storeLogo.png';
import URL from '../../../common/constant/url';
import DownLine from './downLine';
import CorrectModal from './correctModal';
import Toast from './toast';
import Const from '../../../common/constant/const';
import EventUpload from '../../../common/js/eventUpload';

let title = '优惠详情';

class PreferenceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // jumpcol: '',
            con: '',
            current: 0,
            tabStyle: {
                display: 'none'
            },
            topicRecommendStyle: {},
            showList: false,
            correctModalStatus: false,
            cutTabStyle: false,
            cardListTitleRailStyle: {},
            correctModalShow: false
        };
        this.bankCode = '';
    }

    componentWillMount() {
        hyphenate.setDocumentTitle(title);
        this.props.actions.fetch('', res => {
            let bankCode = res.content.bankList && res.content.bankList[0].bankCode;
            this.bankCode = bankCode;
            bankCode && this.props.actions.fetchRecocardList({bankCode});
            bankCode && this.props.commonActions.fetchBannerPic({
                cfgCode: Const.BANNER_CODE.discountDetail,
                bankCode
            }, res => {
                console.log(res, 55);
            });

        });

        this.props.discountDetail.endFetching = false;

    }

    componentDidMount() {
        // 清除卡列表页缓存位置
        this.props.pagerActions
        && this.props.pagerActions.listCache({
            cardListScrollTop: 0,
            cardListDataCache: null
        });
        // 清除卡列表页数据缓存
        this.props.cardListActions.updateCardListData({}, true);
    }


    componentWillUnmount() {
        this.props.actions.fetchCache();
        this.props.commonActions.fetchBannerCache();
    }

    componentDidUpdate(prevProps, prevState) {
        let headerHeight = this.header ? this.header.clientHeight : 0;
        this.refs.discountBanner.style.marginTop = headerHeight + 'px';
        if (this.state.current !== prevState.current) {
            return;
        }
        // console.log('componentDidUpdate' + '执行');
        // 首次加载判断推卡位标题的位置
        this.cardListTitlePosition();
    }

    // jumpBank() {
    //     EventUpload.pvTj({
    //         ek: 'youhui_apply_card',
    //         chn: 'youhui_' + (hyphenate.getSearchString().requestFrom || '')
    //     });
    // }
    //  切换tab
    itemNav(index) {
        this.setState({
            current: index,
            cardListTitleRailStyle: {background: '#fff'}
        });
        let bankCode = this.props.discountDetail.content.bankList[index].bankCode;
        this.bankCode = bankCode;
        // 切换银行tab埋点
        this.bankTabBannerUv({ek: 'youhui_switch_bank'});
        bankCode && this.props.actions.fetchRecocardList({bankCode});
        bankCode && this.props.commonActions.fetchBannerPic({cfgCode: Const.BANNER_CODE.discountDetail, bankCode});

        // 获取banner的高
        let discountBannerHeight = this.refs.discountBanner.clientHeight;
        // 获取地址的高
        let discountDetailsHeight = this.refs.discountDetails.offsetHeight;
        if (this.state.cutTabStyle) {
            //  console.log( discountBannerHeight, discountDetailsHeight,  tabListHeight, 128)
            this.detailContent.scrollTop = discountBannerHeight + discountDetailsHeight;
        }
        this.refs.discountInformation.style.height = 'auto';
        this.storeDetailScroll();
        this.trackEventUpload('banktab_' + (index + 1));
    }

    // 监听图片加载失败
    imgError = e => {
        e.currentTarget.src = storeLogo;
    };
    // 优惠详情滚动事件
    storeDetailScroll = e => {
        if (!this.refs.discountMain) {
            return;
        }
        // 获取页面的滚动距离
        let detailScrollTop = this.detailContent.scrollTop;
        // 获取header的高度
        let headerHeight = this.header ? this.header.clientHeight : 0;
        // 获取银行名称列表的offsetTop(获取的都是正常为显示的银行tab)
        let tabListOffsetTop = this.refs.tabList.offsetTop;
        // console.log(103, detailScrollTop, headerHeight, tabListOffsetTop)
        // 吸顶--当页面滚动距离+header高度>=银行名称列表的offsetTop时，tablist固定定位到header下面
        if (detailScrollTop + headerHeight >= tabListOffsetTop) {
            console.log('银行该固定了----->');
            this.setState({
                tabStyle: {
                    position: 'fixed',
                    top: headerHeight + 'px',
                    zIndex: 101,
                    display: 'block'
                },
                cutTabStyle: true
                // detailScrollTop: detailScrollTop
            });
        }
        else {
            console.log('银行该解除了----->');
            this.setState({
                tabStyle: {
                    position: 'static',
                    display: 'none'
                },
                // detailScrollTop: detailScrollTop,
                cutTabStyle: false
            });
        }


        if (!this.refs.cardListTitle) {
            return;
        }
        this.cardListTitlePosition();
    };


    // 判断推卡位标题的位置
    cardListTitlePosition = () => {
        // console.log(3333);
        // 获取屏幕的高度
        let windowHeight = window.innerHeight;
        // 获取详情的内容高度
        if (!this.refs.discountMain || !this.refs.cardListTitle) {
            return;
        }
        // 获取页面的滚动距离
        let detailScrollTop = this.detailContent.scrollTop;
        // 获取正常位置推卡为标题距离顶部的偏移量
        let cardListTitleOffsetTop = this.refs.cardListTitle.offsetTop;
        // 推卡位标题的高度
        let cardListTitleHeight = this.refs.cardListTitle.clientHeight;
        // console.log(999999, cardListTitleOffsetTop, detailScrollTop, windowHeight, cardListTitleHeight);
        if (cardListTitleOffsetTop - detailScrollTop >= windowHeight - cardListTitleHeight) {
            // console.log('吸底');
            this.cutCardListHeader(true);
        }
        else {
            // console.log('不吸底');
            this.cutCardListHeader();
        }
        // 获取header的高度
        let headerHeight = this.header ? this.header.clientHeight : 0;
        // console.log(headerHeight, 202)

        // 给最大的内容增加paddingTop
        // this.detailContent.style.paddingTop = headerHeight + 'px'

        // 给顶部的banner增加marginTop
        // this.refs.discountBanner.style.marginTop = headerHeight + 'px';
    };
    // 改变正常推卡位的title样式
    cutCardListHeader = (isAbsorb = false) => {
        let cardListTitle = this.refs.cardListTitle;
        if (isAbsorb) {
            this.refs.cardListHeader.style.display = 'block';
            let style = {
                background: '#508DF9',
                color: '#fff',
                borderRadius: '6px 6px 0 0'
            };
            for (let i in style) {
                cardListTitle.style[i] = style[i];
            }
        }
        else {
            this.refs.cardListHeader.style.display = 'none';
            let style = {
                background: '#fff',
                color: '#000'
            };
            for (let i in style) {
                cardListTitle.style[i] = style[i];
            }
        }

    };

    // 点击标题-上移
    storeCardListTitleClick = () => {
        // console.log('点击标题', this.refs.tabList);
        // 获取banner图的高度
        let discountBannerHeight = this.refs.discountBanner.clientHeight;
        // 获取地址栏的高度
        let discountDetailsHeight = this.refs.discountDetails.offsetHeight;
        // 如果当前银行tab是置顶的，那切换tab之后也是置顶，并且滑动到第一条优惠信息位置
        let cutTabStyle = this.state.cutTabStyle;
        if (cutTabStyle) {
            this.detailContent.scrollTop = discountBannerHeight + discountDetailsHeight;
        }
        this.setState({
            cardListTitleRailStyle: {background: '#f1f1f1'}
        });
        this.refs.discountInformation.style.height = '0';
        // this.transitionHeight(this.refs.discountInformation, '0')
        this.storeDetailScroll();
        this.trackEventUpload('footertab');

    };
    // 点击标题 - 下移
    cardTitleHide = () => {
        this.setState({
            cardListTitleRailStyle: {background: '#fff'}
        });
        this.refs.discountInformation.style.height = 'auto';
        // this.transitionHeight(this.refs.discountInformation, 'auto')
        this.storeDetailScroll();
    };

    render() {
        let discountDetailList = this.props.discountDetail;
        let content = discountDetailList.content;
        let recocardListContent = this.props.discountDetail.recocardListContent;
        let bannerList = this.props.commonState.mateList;
        // console.log(recocardListContent, 270)
        let {
            current,
            tabStyle,
            correctModalShow,
            correctModalInfo,
            toastOptions,
            toastShow
        } = this.state;
        // console.log('this is render func---->');
        return (
            <div className={styles.discountDetails}
                 id='discountDetails'
                 ref='storeDetailEle'>
                {!(window.isInWallet || window.isBDMap)
                && <Header
                    title={title}
                    getRef={header => this.header = header}
                ></Header>}
                {/* 用于吸顶效果 */}
                {content.bankList
                && content.bankList.length > 0
                && <ul className={styles.tabsList} style={tabStyle}>
                    {content.bankList.map((item, index) => (
                        <li key={index}
                            className={current === index ? styles.active : styles.tablist}
                            onClick={() => this.itemNav.call(this, index)}>
                            <span>{item.name}</span>
                        </li>
                    ))}
                </ul>}

                {/* 用于吸底 */}
                {recocardListContent
                && <h2
                    onClick={this.storeCardListTitleClick}
                    ref='cardListHeader'
                    className={styles.cardListTitleFixed}
                    style={{bottom: 0}}>办卡享优惠
                    <span className={styles.observerDetail}>查看详情</span>
                </h2>}
                {discountDetailList.endFetching
                && content
                && <div className={styles.discountDetailContent}
                        ref={detailContent => this.detailContent = detailContent}
                        onScroll={this.storeDetailScroll}>

                    {content.bankList
                    && content.bankList.length > 0
                    && <div>
                        <div className={styles.discountMain} ref='discountMain'>
                            <div className={styles.discountBanner} ref='discountBanner'>
                                <div className={styles.storeLogo + ' fl'}>
                                    <img src={content.storePic}
                                         className={styles.discountLogo}
                                         onError={this.imgError}/>
                                </div>
                                <div className={styles.storeDesc + ' fl'}>
                                    <h3>{content.storeName}</h3>
                                    <p>{content.district}，{content.brandCatName}</p>
                                </div>
                            </div>
                            <div className={styles.discountDetails + ' clearfix'} ref='discountDetails'>
                                <i className={'iconfont' + ' ' + styles.icon}>&#xe638;</i>
                                <p className={styles.discountAddress}>
                                    {content.storeAddress}
                                </p>
                                {content.storePhone
                                && <a href={'tel:' + content.storePhone.split(',')[0]}>
                                    <i className={'iconfont ' + styles.telIcon}
                                       id='creditcard_storedetail_phone'>&#xe607;</i>
                                </a>}
                            </div>
                            {content.bankList
                            && content.bankList.length > 0
                            && <div className={styles.discountNav}>

                                {/* 正常效果 */}
                                <ul className={styles.tabsList} ref='tabList'>
                                    {content.bankList.map((item, index) => (
                                        <li key={index}
                                            className={current === index ? styles.active : styles.tablist}
                                            onClick={() => this.itemNav.call(this, index)}>
                                            <span>{item.name}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className={styles.discountInformation} ref='discountInformation'>
                                    {content.bankList[current].offers.map((item, index) =>
                                        <DiscountInformation
                                            key={index}
                                            information={item}
                                            index={index}
                                            current={current}
                                            actions={this.props.actions}
                                            cfgCode={content.cfgCode || 'nocfgcode'}
                                            trackEventUpload={this.trackEventUpload}
                                            showCorrectModal={this.showCorrectModal}
                                            bannerList={bannerList}
                                            bankCode={this.bankCode}
                                            bankTabBannerUv={this.bankTabBannerUv}
                                        />
                                    )}
                                    <div className={styles.disclaimer}>
                                        <i className={'iconfont ' + styles.disclaimerIcon}>&#xe77e;</i>
                                        <span>以上优惠以银行和商户公布信息为准</span>
                                    </div>
                                </div>
                            </div>}
                        </div>
                        {/* 推卡位 */}
                        {recocardListContent
                        && <div className={styles.topicRecommend} ref='topicRecommend'>

                            {/* 正常位置 */}
                            {recocardListContent
                            && <h2 ref='cardListTitle'
                                   className={styles.cardListTitle}
                                   onClick={this.cardTitleHide}>办卡享优惠
                                <span style={this.state.cardListTitleRailStyle}></span>
                            </h2>}
                            {<ul className={styles.listWrapper}>
                                {recocardListContent.map((item, index) => (
                                    <li key={index} className={styles.cardItem}
                                        onClick={this.cardClick.bind(this, item.cardCode)}>
                                        <div className={styles.cardDesc + ' clearfix'}>
                                            <img src={item.logoUrl}/>
                                            <div className={styles.detailWrapper}>
                                                <h5>{item.cardName}</h5>
                                                {item.keywords
                                                && item.keywords.length > 0
                                                && <p className={styles.keywordsW}>
                                                    {item.keywords.map((item, index) =>
                                                        <span key={index} className={styles.keywordsItem}>
                                                                            {item}
                                                                        </span>)}
                                                </p>}
                                                <ul className={styles.cardRights}>
                                                    {item.rightsInfo.map((item, index) =>
                                                        <li key={index}>
                                                            {item.map((itm, inx) =>
                                                                itm.isHighlight === 'true'
                                                                    ? <i key={inx}>{itm.text}</i>
                                                                    : <span key={inx}>{itm.text}</span>
                                                            )}
                                                        </li>)}
                                                </ul>
                                            </div>
                                            <p className={styles.applyBtn}>
                                                申请</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>}
                        </div>}
                    </div> || <DownLine title='优惠已过期'/>}
                </div>}
                {correctModalShow
                && <CorrectModal
                    correctInfo={correctModalInfo}
                    actions={this.props.actions}
                    cfgCode={content.cfgCode || 'nocfgcode'}
                    hideCorrectModal={this.hideCorrectModal}
                    {...this.toastConfig()}
                    trackEventUpload={this.trackEventUpload}/>}
                {toastShow
                && <Toast
                    options={toastOptions}
                    complete={this.hideToast}/>}

            </div>
        );
    }

    // 上报百度事件分析
    trackEventUpload = trackId => {
        global.bdTrackEvent('discountdetail_' + trackId);
    };

    // 银行切换tab和tab下banner的点击pv/uv
    bankTabBannerUv = (ek = {}, jumpUrl = null) => {
        let validKey = ['requestFrom', 'tid'];
        let searchObj = hyphenate.getSearchString();
        let uploadParams = pick(searchObj, validKey);
        EventUpload.eventTj({bkc: this.bankCode, ...uploadParams, ...ek});
        setTimeout(() => {
            if (jumpUrl) {
                location.href = hyphenate.concatChnQuery(jumpUrl);
            }
        }, 100);
    };
    // 推卡位点击
    cardClick = cardCode => {
        this.trackEventUpload('recommendcard');
        location.href = hyphenate.concatChnQuery(URL.GET_CREDIT_APPLY, `cardCode=${cardCode}`);
    };
    // 显示
    showCorrectModal = correctModalInfo => {
        this.setState({
            correctModalInfo,
            correctModalShow: true
        });
    };
    // 隐藏
    hideCorrectModal = () => {
        this.setState({
            correctModalShow: false
        });
    };
    // toast提示
    toastConfig = () => {
        let vm = this;
        return {
            warnToast() {
                vm.setState({
                    toastShow: true,
                    toastOptions: {
                        time: 2,
                        title: '请至少选择或填写一个原因',
                        iconType: 'warn' // 警告图标
                    }
                });
            },
            successToast() {
                vm.setState({
                    toastShow: true,
                    toastOptions: {
                        time: 1,
                        title: '感谢您的反馈',
                        iconType: 'success' // 成功图标
                    }
                });
            }
        };
    };
    // 隐藏toast提示
    hideToast = () => {
        this.setState({
            toastShow: false
        });
    }
}

const mapStateToProps = state => ({
    discountDetail: state.discountDetail,
    commonState: state.commonState

});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
    pagerActions: bindActionCreators(pagerActions, dispatch),
    cardListActions: bindActionCreators(cardListActions, dispatch),
    commonActions: bindActionCreators(commonActions, dispatch)
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PreferenceDetail);

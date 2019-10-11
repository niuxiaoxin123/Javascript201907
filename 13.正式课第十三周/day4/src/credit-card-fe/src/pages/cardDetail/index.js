/**
 * @file 程序主入口 js
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/27
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
import downline from './imgs/downlinecard.png';
import {Link, browserHistory} from 'react-router';
import Activity from './imgs/activity.png';
import applyLogoImg from './imgs/shenqing.png';
import arrowImg from './imgs/rightArrow.png';
import inforEditImg from './imgs/tianxie.png';
import infoSubmitImg from './imgs/tijiao.png';
import infoConfirmImg from './imgs/shenhe.png';
import dotImg from './imgs/dot.png';
import rightsImg from './imgs/rightsLogo.png';
import processImg from './imgs/processLogo.png';
import Player from '../components/player';
import Modal from './modal';
import LoanSection from '../components/loanSection';
import RecommendTitle from '../components/recommendTitle';
import CardItem from '../components/cardItem';
import {bdQiao} from '../../common/js/bdTongji';

const title = '信用卡详情';

class CardDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRights: false,
            videoShow: false,
            rightsModalShow: false // 专属权益弹窗是否显示
        };
        // 视频详情工具栏
        this.videoToolBar = [{
            icon: require('../../common/imgs/rights.png'),
            title: '权益',
            click: this.showRightsModal
        }, {
            icon: require('../../common/imgs/youhui.png'),
            title: '优惠',
            click: bankCode => {
                this.trackUpload('store_video');
                // this.props.commonActions.cacheSearch({ bankCode });
                window.storeListSearchCache = {bankCode};
                browserHistory.push(hyphenate.concatChnQuery(global.CONSTS.ROUTE.STORE_LIST))
            }
        }, {
            icon: require('../../common/imgs/more.png'),
            title: '更多',
            click: this.cardModelMore
        }]
    }

    componentWillMount() {
        this.props.actions.fetch({}, res => {
            if (res.videoInfo && res.videoInfo.videoUrl) {
                this.setState({
                    videoShow: true
                });
            }
            if ((hyphenate.getSearchString().sid || '').indexOf('shangqiao') !== -1) {
                bdQiao();
            }
            // 获取推荐卡
            this.props.commonActions.fetchCardRecommend();
            // 获取推荐贷款产品
            this.props.commonActions.fetchProductRecommend({
                productType: 'XD'
            });
        });
        hyphenate.setDocumentTitle(title);
        window.scrollTo(0, 0);
    }

    componentWillUnmount() {
        this.props.actions.clearCache();
    }

    componentDidUpdate() {
        let cardDetail = this.props.cardDetail;
        cardDetail.endFetching
            && cardDetail.content
            && cardDetail.content.cardTitle
            && (hyphenate.setDocumentTitle(cardDetail.content.cardTitle));
    }

    render() {
        const cardDetail = this.props.cardDetail;
        let {
            recommendCard,
            recommendLoan
        } = this.props.commonState;
        let {
            videoShow,
            needTrackEvent
        } = this.state;
        let detailInfor = cardDetail && cardDetail.content.cardDetail && cardDetail.content.cardDetail[1].content || '';
        let headerTitle = cardDetail.content && cardDetail.content.cardTitle || title;
        return (
            cardDetail.endFetching && <div className={styles.cardDetail}>
                {!(window.isInWallet || window.isBDMap)
                    && <Header title={headerTitle} />}
                {cardDetail.content
                    ? <div className={styles.cardContent + ' '
                        + (cardDetail.content.videoInfo && styles.videoCardContent)}>

                        {/* 视频图文切换 */}
                        {cardDetail.content.videoInfo
                            && cardDetail.content.videoInfo.videoUrl
                            && <div className={styles.tabBar + ' ' + (videoShow && styles.videoTab)}>
                                <span className={videoShow && styles.active} onClick={this.videoTabHandle}>视频</span>
                                <span className={!videoShow && styles.active} onClick={this.picTabHandle}>图文</span>
                            </div>}

                        {/* 视频详情 */}
                        {cardDetail.content.videoInfo
                            && cardDetail.content.videoInfo.videoUrl
                            && <div className={styles.videoWrapper + ' ' + (!videoShow && styles.hide)}>
                                <Player src={cardDetail.content.videoInfo.videoUrl}
                                    getPauseCb={this.videoPauseCb}
                                    getPlayCb={this.vodeoPlayCb}
                                    trackUpload={this.trackUpload}
                                    needTrackEvent={needTrackEvent}
                                    poster={cardDetail.content.videoInfo.videoPoster}
                                />
                                <ul className={styles.toolBar}>
                                    {this.videoToolBar.map((toolItem, index) =>
                                        <li key={index}
                                            onClick={toolItem.click.bind(this, cardDetail.content.bankCode)}>
                                            <img className={styles.toolItem} src={toolItem.icon} />
                                            <span>{toolItem.title}</span>
                                        </li>)}
                                </ul>
                            </div>}

                        {/* 图文详情 */}
                        <div className={styles.picWrapper + ' ' + (videoShow && styles.hide)}>
                            <div className={styles.imgContainer}>
                                <img src={cardDetail.content.logoUrl} className={styles.banner} />
                            </div>
                            <div className={styles.detailWrapper}>
                                <div className={styles.detailHeader}>
                                    <h5>{cardDetail.content.cardName}</h5>
                                    {cardDetail.content.cardDesc
                                        && <p className={styles.titleTip}>{cardDetail.content.cardDesc}</p>}
                                    {cardDetail.content.tags
                                        && cardDetail.content.tags.length && <ul className={styles.tag}>
                                            {cardDetail.content.tags.map((tag, index) => (
                                                <li key={index}>{tag}</li>
                                            ))}
                                        </ul>}
                                    {cardDetail.content.hasActivity === '1'
                                        && cardDetail.content.activityInfo
                                        && <Link
                                            to={hyphenate.concatChnQuery(cardDetail.content.activityInfo.url || '#')}
                                            className={styles.activityBar}>
                                            <img alt='热门活动' src={Activity} />
                                            <p>{cardDetail.content.activityInfo.title}</p>
                                            <span>详情</span>
                                            <span><i className='iconfont'>&#xe630;</i></span>
                                        </Link>}
                                </div>
                                <div className={styles.hrLine}></div>
                                <div className={styles.detail}>
                                    <div className={styles.nav}>
                                        <img src={rightsImg} />
                                        <h5>专属权益</h5>
                                        <ul onClick={this.cardModelMore} className={styles.more}>
                                            <span>更多信息</span>
                                            <i className='iconfont'>&#xe630;</i>
                                        </ul>
                                    </div>
                                    <ul className={styles.listwarpper}>
                                        {this.renderRightsContent(cardDetail)}
                                    </ul>
                                </div>
                                <div className={styles.hrLine}></div>
                            </div>
                            <div className={styles.detail}>
                                <div className={styles.nav}>
                                    <img src={processImg} />
                                    <h5>办卡流程</h5>
                                </div>
                                <ul className={styles.bankList}>
                                    <li>
                                        <img src={applyLogoImg} alt='' />
                                        <p>点击申请</p>
                                    </li>
                                    <span>
                                        <img className={styles.arrowImg} src={arrowImg} alt='' />
                                    </span>
                                    <li>
                                        <img src={inforEditImg} alt='' />
                                        <p>官网填写</p>
                                    </li>
                                    <span>
                                        <img className={styles.arrowImg} src={arrowImg} alt='' />
                                    </span>
                                    <li>
                                        <img src={infoSubmitImg} alt='' />
                                        <p>提交信息</p>
                                    </li>
                                    <span>
                                        <img className={styles.arrowImg} src={arrowImg} alt='' />
                                    </span>
                                    <li>
                                        <img src={infoConfirmImg} alt='' />
                                        <p>银行审核</p>
                                    </li>
                                </ul>
                                <ul className={styles.announce}>
                                    <span className={styles.announceLine + ' ' + styles.announceLineLeft}></span>
                                    <span>已有
                                        <span className={styles.applyCount}>
                                            {cardDetail.content.applyCount}人
                                        </span>对此卡感兴趣
                                    </span>
                                    <span className={styles.announceLine + ' ' + styles.announceLineRight}></span>
                                </ul>
                            </div>
                            {recommendCard.endFetching
                                && recommendCard.cardList
                                && recommendCard.cardList.length > 0
                                && <div className={styles.guessYouLike}>
                                    <RecommendTitle title='猜你喜欢' />
                                    <ul className={styles.likeList}>
                                        {recommendCard.cardList.map((item, index) =>
                                            <CardItem
                                                itemData={item}
                                                key={index}
                                                classname={styles.likeCard}
                                                trackIdCode={'carddetail_guessyoulike_' + (index + 1)}
                                                query={`path=${hyphenate.ctPath()}}`}
                                                clickHandle={this.likeCardClick.bind(this, item)} />)}
                                    </ul>
                                </div>}
                            {recommendLoan.endFetching
                                && <LoanSection loanList={recommendLoan.loanList} pageName='cardDetail' />}
                        </div>

                        {/* 免费办卡 */}
                        <div className={styles.apply}
                            onClick={this.applyBtnClick.bind(this, cardDetail.content.cardCode)}>
                            <a>免费办卡</a>
                        </div>

                        {/* 专属权益弹窗 */}
                        {this.state.rightsModalShow
                            && <Modal title='专属权益' close={this.closeRightsModal} class={styles.rightsModal}>
                                <ul className={styles.listwarpper}>
                                    {this.renderRightsContent(cardDetail)}
                                </ul>
                            </Modal>}

                        {/* 更多信息弹窗 */}
                        {this.state.showRights && <div className={styles.modal}>
                            <div className={styles.modalContainer}>
                                <div className={styles.modalContent}>
                                    <div className={styles.head}>
                                        <span>基础信息</span>
                                    </div>
                                    <div className={styles.content}>
                                        <ul className={styles.listWrapper}>
                                            <li className={styles.list} dangerouslySetInnerHTML={{
                                                __html: detailInfor
                                            }}>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={styles.footers}>
                                    <span>
                                        <i onClick={this.cardModelClose}
                                            className={'iconfont' + ' ' + styles.arrowheadDown}>&#xe605;</i>
                                    </span>
                                </div>
                            </div>
                        </div>}

                    </div>
                    : <div className={styles.downlinepage}>
                        <div className={styles.downlinecard}>
                            <h3>
                                <span><img src={downline} /></span>
                                <p>很抱歉，该卡片已经下线</p>
                            </h3>
                        </div>
                    </div>}
            </div> || <Loading />);
    }

    // 图文-专属权益
    renderRightsContent = cardData => {
        if (cardData.content && cardData.content.cardDetail) {
            let cardDetails = cardData.content.cardDetail;
            let rightInforList = cardDetails[0].content;

            return rightInforList.map((textList, index) =>
                (<li key={index}>
                    <ul className={styles.listcontent}>
                        <li>
                            <div className={styles.rightsText}>{this.renderText(textList, index)}</div>
                        </li>
                    </ul>
                </li>)
            );
        }
    }
    // 图文-专属权益-文字
    renderText = (textList, rowIndex) => {
        let node = [];
        node.push(<img key={rowIndex} src={dotImg} alt='' />);
        textList.map((item, textIndex) => {
            if (item.isHighlight === 'false') {
                node.push(<span key={'' + rowIndex + textIndex}>{item.text}</span>);
            }
            else {
                node.push(<span key={'' + rowIndex + textIndex} className={styles.highlight}>{item.text}</span>);
            }
        });
        return node;
    }
    // 更多信息弹窗
    cardModelMore = () => {
        this.setState({
            showRights: true
        });
        if (this.state.videoShow) {
            this.videoPause('more_video');
        } else {
            this.trackUpload('more_pic');
        }
    }
    // 上报百度统计分析埋点
    trackUpload = trackId => {
        global.bdTrackEvent('carddetail_' + trackId);
    }
    // 关闭更多信息弹窗
    cardModelClose = () => {
        this.setState({
            showRights: false
        });
        this.state.videoShow && this.videoPlay('more_close'); // 继续播放视频
    }
    // 切换视频
    videoTabHandle = () => {
        console.log('切换视频', this.state.videoShow);
        if (!this.state.videoShow) {
            this.setState({
                videoShow: true
            });
            this.videoPlay('switch_video');
        }
    }
    // 切换图文
    picTabHandle = () => {
        console.log('切换图文');
        if (this.state.videoShow) {
            this.setState({
                videoShow: false
            });
            this.videoPause('switch_pic');
        }
    }
    // 子组件暂停视频函数
    videoPauseCb = videoPauseCtrl => {
        this.videoPauseCtrl = videoPauseCtrl;
    }
    // 子组件播放视频函数
    vodeoPlayCb = videoPlayCtrl => {
        this.videoPlayCtrl = videoPlayCtrl;
    }
    // 本组件播放视频
    videoPlay = trackId => {
        this.videoPlayCtrl && this.videoPlayCtrl();
        this.trackUpload(trackId);
    }
    // 本组件暂停视频
    videoPause = trackId => {
        console.log('暂停');
        this.videoPauseCtrl && this.videoPauseCtrl();
        this.trackUpload(trackId);
    }
    // 显示专属权益弹窗
    showRightsModal = () => {
        this.setState({
            rightsModalShow: true
        });
        this.state.videoShow && this.videoPause('rights_video');
    }
    // 关闭专属权益弹窗
    closeRightsModal = () => {
        this.setState({
            rightsModalShow: false
        });
        this.state.videoShow && this.videoPlay('rights_close'); // 继续播放视频
    }
    // 免费申请按钮点击埋点
    applyBtnClick = cardCode => {
        let videoShow = this.state.videoShow;
        global.eventUpload.eventTj({
            btnId: 'creditcard_carddetail_' + (videoShow ? 'apply_video' : 'apply_pic')
        });
        setTimeout(() => {
            window.location.href = hyphenate.concatChnQuery(global.CONSTS.URL.GET_CREDIT_APPLY,
                `cardCode=${cardCode}`);
        }, 100);
    }
    // 猜你喜欢卡片点击事件
    likeCardClick = cardInfo => {
        global.eventUpload.eventTj({
            btnId: 'creditcard_carddetail_guessyoulike',
            referer: cardInfo.cardCode || 'nocardcode'
        });
    }
}

const mapStateToProps = state => ({
    cardDetail: state.cardDetail,
    commonState: state.commonState
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
    commonActions: bindActionCreators(commonActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardDetail);

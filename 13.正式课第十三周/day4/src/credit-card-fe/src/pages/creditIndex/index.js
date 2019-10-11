/**
 * @file 首页 js
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2017/6/15
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';

import * as actions from './actions';
import * as pagerActions from '../components/pager/actions';
import * as cardListActions from '../cardList/actions';
import * as commonActions from '../../actions';
import styles from './index.scss';
// import Swiper from 'swiper';
// import 'swiper/dist/css/swiper.css';
import CardItem from '../components/cardItem';
import TabBar from '../components/TabBar';
import TitleBar from '../components/titleBar';
import hyphenate from '../../common/js/hyphenate';
import {Loading} from '../components/tip';
import Swiper from '../components/swiper';

const title = '百度信用卡中心';
let hide = true;

class CreditIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: true,
            tips: ''
        };
    }


    componentDidUpdate() {
        let creditIndex = this.props.creditIndex;
        const activityList = creditIndex.list.activityList;
        const notice = creditIndex.list.notice;
        // 滚动公告实例化
        // if (this.mySwiper) {
        //     this.mySwiper.slideTo(0, 0);
        //     this.mySwiper.destroy();
        //     this.mySwiper = null;
        // }
        // if (creditIndex.endFetching && notice.length > 0) {
        //     this.mySwiper = new Swiper('#notice-swiper-container', {
        //         startSlide: 1,
        //         direction: 'vertical',
        //         loop: true,
        //         autoplay: true,
        //         speed: 800
        //     });
        // }
        // if (this.bannerSwiper) {
        //     this.bannerSwiper.slideTo(0, 0);
        //     this.bannerSwiper.destroy();
        //     this.bannerSwiper = null;
        // }
        // if (creditIndex.endFetching && activityList.length > 1) {
        //     this.bannerSwiper = new Swiper('#banner-swiper-container', {
        //         startSlide: 1,
        //         loop: true,
        //         autoplay: true,
        //         speed: 800,
        //         pagination: {
        //             el: '.swiper-pagination',
        //             clickable: true
        //         }
        //     });
        // }
    }

    componentDidMount() {
        // 请求banner图数据
        // this.props.actions.fetchBannerPic({cfgCode: Const.BANNER_CODE.creditIndex}, res => {
        //     console.log(res, 89);
        // });

        this.props.actions.fetchIndex();


        window.isInWallet && this.props.commonActions.fetchPersonalDynamic();
        hyphenate.setDocumentTitle(title);
        // 清除卡列表页缓存位置
        this.props.pagerActions
            && this.props.pagerActions.listCache({
                cardListScrollTop: 0,
                cardListDataCache: null
            });
        // 清除卡列表页数据缓存
        this.props.cardListActions.updateCardListData({}, true);
    }

    jumpBanner = index => {
        global.eventUpload.eventTj({
            btnId: 'creditcard_creditindex_banner_' + index
        });
    };

    render() {
        let creditIndex = this.props.creditIndex;
        let commonState = this.props.commonState;
        let endFetching = creditIndex.endFetching;
        const {
            currentRecommendList,
            cardList,
            // notice,
            bankList,
            hotTopicList,
            toolbar,
            bannerList,
            bottomBanner
        } = creditIndex.list;
        let [
            hotBanksMQ,
            currentRecommendMQ,
            hotCardsMQ
        ] = [
                `path=${hyphenate.ctPath()}&module=home_hotbank`,
                `path=${hyphenate.ctPath()}&module=home_hotcards`,
                `path=${hyphenate.ctPath()}&module=home_cardList`
            ];
        return (
            endFetching
            && <div className={`${styles.creditIndex} clearfix`}>
                {bannerList.length > 0
                    && <div className={styles.bannerBg}></div>}
                {/* 标题栏 */}
                <TitleBar
                    isZPBug={window.isZPBug}
                    noColor={true}>
                    {window.isInWallet
                        && <Link to={hyphenate.concatChnQuery('/bkrcredit/personalCenter')}
                            className={styles.avatar + ' ' + styles.flex}
                            onClick={this.trackUpload.bind(this, 'applyprogress')}>
                            <div className={styles.userImg}>
                                <img src={creditIndex.list.avatar
                                    ? creditIndex.list.avatar : require('./imgs/avatar.png')} alt='头像'/>
                            </div>
                            <span>我的</span>
                            {commonState.endFetching
                                && commonState.personalDynamic
                                && commonState.personalDynamic.couponDynamic
                                && commonState.personalDynamic.couponDynamic.total - 0 > 0
                                && <i className={styles.hasNewCoupon}></i>}
                        </Link>}
                </TitleBar>
                {/* 广告位 */}
                {/* {hyphenate.getSearchString().requestFrom === 'mgm' && <div className={styles.banner}>
                    <div className={styles.jumpBanner}
                         onClick={this.jumpBanner.bind(this)}>
                        <img src={banner}/>
                        <img src={imgUrl} />

                    </div>
                    <div className='swiper-container' id='banner-swiper-container'>
                        <ul className='swiper-wrapper'>
                        <li>
                        </li>
                            {creditIndex.endFetching && activityList.map((item, index) => (
                                <li className='swiper-slide' key={index}>
                                    <a href={hyphenate.concatChnQuery(item.url)}
                                        id={'credicard_homepage_advertising_' + (index + 1)}>
                                        <img src={item.imgUrl} alt='' key={index} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className={styles.dots + ' swiper-pagination'} />
                    </div>
                </div>} */}
                {bannerList.length > 0
                    && <div className={styles.banner}>
                        <Swiper bannerList={bannerList}
                            code='creditindex_banner'
                            swiperId='#public-swiper-container'
                            paginationName='pagination'
                            jumpBanner={this.jumpBanner}
                            height='3.188'
                        />
                    </div>}


                {/* 公告部分 */}
                {/* {creditIndex.endFetching && notice && notice.length > 0
                    && <div className={styles.pub_notice + ' ' + styles.flex}>
                        <img src={require('./imgs/home-notice-logo.png')} />
                        <div className={styles.swiperContainer + ' swiper-container'}
                            id='notice-swiper-container'>
                            <ul className={styles.swiperWrapper + ' swiper-wrapper'}>
                                {notice.map((item, index) => {
                                    return (
                                        <li className={styles.swiperSlide + ' swiper-slide'}
                                            key={index}
                                            id={'caredicard_homepage_message_' + (index + 1)}>
                                            <a href={item.jumpUrl || 'javascript:;'}>{item.announceContent}</a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>} */}

                {/* 热门银行 */}
                <div className={styles.hotBanks}>
                    <div className={styles.hotBankTitle + ' ' + styles.flex}>
                        <h2 className={styles.blockTitle}>热门银行</h2>
                        <Link
                            to={hyphenate.concatChnQuery('/bkrcredit/cardList', hotBanksMQ)}
                            onClick={this.trackUpload.bind(this, 'allbank')}>
                            全部信用卡
                            <i className='iconfont'>&#xe630;</i>
                        </Link>
                    </div>
                    <ul className={styles.bankList}
                        style={bankList && bankList.length > 8 && hide ? {height: '4.9rem'} : {height: null}}>
                        {bankList
                            && bankList.length > 0
                            && bankList.map((item, index) => (
                                <li key={index}
                                    data-bank-code={item.bankCode}>
                                    <Link to={hyphenate.concatChnQuery(item.url, `nf=fbank&${hotBanksMQ}`)}
                                        onClick={this.trackUpload.bind(this, 'hotbank_' + (index + 1))}>
                                        <img src={item.icon} alt=''/>
                                        <p>{item.bankNameCh}</p>
                                        {item.tags && <span>{item.tags}</span>}
                                    </Link>
                                </li>
                            ))}
                    </ul>
                    {bankList
                        && bankList.length > 8
                        && <div className={styles.more}>
                            {hide && <h5
                                className={styles.down}
                                onClick={this.showMore}>展开更多 <i className='iconfont'>&#xe636;</i>
                            </h5>}
                            {!hide && <h5
                                className={styles.up}
                                onClick={this.hideMore}>收起更多 <i className='iconfont'>&#xe635;</i>
                            </h5>}
                        </div>}

                </div>

                {/* 本期力荐卡 */}
                {currentRecommendList
                    && <div className={styles.recommendBanner}>
                        <Swiper bannerList={currentRecommendList}
                            title='本期力荐'
                            code='creditindex_hotcards'
                            query={currentRecommendMQ}
                            isRecommendSwiper='true'
                            swiperId='#recommend-swiper-container'
                            delay='7000'
                        />
                    </div>}

                {/* {creditIndex.endFetching
                && <RecommendList title='本期力荐'
                                  listData={currentRecommendList}
                                  className={styles.recommendList}
                                  code='creditindex_hotcards'
                                  query={currentRecommendMQ}/>} */}
                {/* 工具区*/}
                {toolbar && toolbar.length > 1 && <ul className={styles.toolbar}>
                    {toolbar.slice(0, 2).map((item, index) =>
                        <li key={index}
                            onClick={this.trackUpload.bind(this, 'toolbar_' + (index + 1))}>
                            <a href={hyphenate.concatChnQuery(item.jumpUrl)}>
                                <img src={item.imageUrl}/>
                            </a>
                        </li>
                    )}
                </ul>}

                {/* 热门推荐 */}
                {hotTopicList
                    && hotTopicList.length > 0
                    && <div className={styles.hotRecommend}>
                        <h2 className={styles.blockTitle}>热门推荐</h2>
                        <ul className={styles.hotRecommendListVertical + ' ' + styles.flex}>
                            {this.renderHotRecommendItem(1)}
                        </ul>
                        <ul className={styles.hotRecommendListVertical + ' ' + styles.flex}>
                            {this.renderHotRecommendItem(2)}
                        </ul>
                        <ul className={styles.hotRecommendListAcross + ' ' + styles.flex}>
                            {this.renderHotRecommendItem(3)}
                        </ul>
                    </div>}

                {/* 热门卡片 */}
                {cardList
                    && cardList.length > 0
                    && <div className={styles.hotCards}>
                        <div className={styles.hotCardsTitle + ' ' + styles.flex}>
                            <h2 className={styles.blockTitle}>热门卡片</h2>
                            <Link to={hyphenate.concatChnQuery('/bkrcredit/cardList', hotCardsMQ)}
                                onClick={this.trackUpload.bind(this, 'cardmore')}>
                                更多
                            <i className='iconfont'>&#xe630;</i>
                            </Link>
                        </div>
                        <ul className={styles.hotCardsList}>
                            {cardList.map((item, index) =>
                                <CardItem key={index} itemData={item} query={hotCardsMQ}
                                    trackIdCode={'creditindex_cardlist_' + (index + 1)} />
                            )}
                        </ul>
                        {/* <div className={styles.more}>
                        <Link to={hyphenate.concatChnQuery('/bkrcredit/cardList', hotCardsMQ)}
                              onClick={this.trackUpload.bind(this, 'cardall')}>
                            <h5>查看全部信用卡<i className='iconfont'>&#xe630;</i>
                            </h5>
                        </Link>
                    </div> */}
                    </div>}

                {/* 底部banner图 */}
                {bottomBanner
                    && bottomBanner.length > 0
                    && <Link to={hyphenate.concatChnQuery(bottomBanner[0].jumpUrl)}
                        onClick={this.trackUpload.bind(this, 'bottombanner_1')}>
                        <div className={styles.bottomBanner}>
                            <img src={bottomBanner[0].image} />
                        </div>
                    </Link>}

                {/* tab-bar */}
                {!window.isInWallet
                    && <div className={styles.centerBottom}>
                        <TabBar/>
                    </div>}
            </div> || <Loading/>
        );
    }

    // 渲染热门推荐部分4个大栏位和4个小栏位
    renderHotRecommendItem(n) {
        let creditIndex = this.props.creditIndex;
        const hotTopicList = this.props.creditIndex.list.hotTopicList;
        return creditIndex.endFetching
            && hotTopicList.map((item, index) => {
                if (n === 1 && index <= 1
                    || n === 2 && index > 1 && index < 4
                    || n === 3 && index >= 4) {
                    return (
                        <li key={index}>
                            <Link to={hyphenate.concatChnQuery(item.url,
                                `path=${hyphenate.ctPath()}&module=home_theme`)}
                                className={n === 3 && index >= 4 ? '' : styles.flex}
                                onClick={this.trackUpload.bind(this, 'theme_' + (index + 1))}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>
                                        {item.subTitle.split('-')[0]}
                                        <span className={styles.a}>{item.subTitle.split('-')[1]}</span>
                                    </p>
                                </div>
                                <div className={styles.hotRecomendListImg + ' ' + styles.flex}>
                                    <img src={item.icon} alt='' key={index}/>
                                </div>
                            </Link>
                        </li>
                    );
                }
            });
    }

    // 展开更多
    showMore = () => {
        hide = false;
        this.setState({
            hide: false
        }); // 没什么具体意义，就是为了让它更新页面
        this.trackUpload('showmore');
    }

    // 收起更多
    hideMore = () => {
        hide = true;
        // 没什么具体意义，就是为了让它更新页面
        this.setState({
            hide: true
        }); // 没什么具体意义，就是为了让它更新页面
        this.trackUpload('hidemore');
    }
    // 上报百度统计埋点
    trackUpload = (trackIdCode, url) => {
        global.bdTrackEvent('creditindex_' + trackIdCode);
    }
}

const mapStateToProps = state => ({
    creditIndex: state.creditIndex,
    commonState: state.commonState,
    mgmLogin: state.mgmLogin
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
)(CreditIndex);

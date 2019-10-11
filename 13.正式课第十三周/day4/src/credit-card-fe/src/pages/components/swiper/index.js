/**
 * @file 轮播图 组件 js
 * @author v_renbaosen(v_renbaosen@baidu.com)
 * @date 2019/1-17
 */
import React, {Component} from 'react';
import styles from './index.scss';
import hyphenate from '../../../common/js/hyphenate';
// import {Link} from 'react-router';

import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';

export default class swiper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoop: true
        };
        this.bankCode = '';
    }

    componentWillMount() {
        this.bankCode = hyphenate.getSearchString().bankCode;
        let {
            bannerList = []
        } = this.props;
        if (bannerList.length <= 1) {
            this.setState({isLoop: false});
        }
    }

    componentDidMount() {
        let {
            swiperId = '#public-swiper-container',
            delay = 5000,
            jumpBanner = '',
            bannerList = []
        } = this.props;
        let self = this;
        // 滚动公告实例化
        if (this.mySwiper) {
            this.mySwiper.slideTo(0, 0);
            this.mySwiper.destroy();
            this.mySwiper = null;
        }
        this.mySwiper = new Swiper(swiperId, {
            autoplay: { // 自动滚动
                delay: delay, // 停留时间
                disableOnInteraction: false
            },
            loop: this.state.isLoop, // 无缝滚动
            speed: 1000, // 滚动时间
            pagination: {
                el: '.swiper-pagination'
            },
            on: {
                tap: function (e) {
                    let realIndex = this.realIndex;
                    let code = self.props.code;
                    global.bdTrackEvent(code + '_' + (realIndex + 1));
                    jumpBanner && jumpBanner(realIndex + 1);
                    setTimeout(() => {
                        if (swiperId !== '#recommend-swiper-container') {
                            // console.log(bannerList[realIndex].jumpUrl, 59);
                            window.location.href = hyphenate.concatChnQuery(bannerList[realIndex].jumpUrl)
                        }
                    }, 100);
                }
            }
        });
    }

    componentWillUnmount() {
        if (this.mySwiper) { // 销毁swiper
            this.mySwiper.destroy();
        }
    }

    render() {
        let {
            bannerList,
            title,
            query,
            isRecommendSwiper,
            paginationName,
            height
        } = this.props;
        let isLoop = this.state.isLoop;
        return (
            <div>{!isRecommendSwiper ? <main className={styles.basicsMain}>
                {bannerList && <div className={styles.container + ' swiper-container'}
                                    id='public-swiper-container'>
                    <ul className={styles.wrapper + ' swiper-wrapper'}>
                        {bannerList.map((item, index) => {
                            return <li className={'swiper-slide'}
                                       key={index}
                                       id={item.jumpUrl}
                                       >
                                {/* <a href={hyphenate.concatChnQuery(item.jumpUrl)}> */}
                                <div>
                                    <img style={height ? {'height': height + 'rem'} : null}
                                         src={item.image}
                                    />
                                </div>
                                {/* </a> */}
                            </li>;

                        })}

                    </ul>
                    {isLoop && <div className={styles[paginationName] + ' swiper-pagination'}></div>}
                </div>}
            </main> : <main className={styles.recommendMain}>
                {/* <h2>{title}</h2> */}
                {bannerList && <div className={styles.container + ' swiper-container'}
                                    id='recommend-swiper-container'>
                    <ul className={styles.wrapper + ' swiper-wrapper'}>
                        {bannerList.map((item, index) => {
                            return <li className={styles.slide + ' swiper-slide'} key={index}>
                                <a href={hyphenate.concatChnQuery(item.url, query || '')}>
                                    <div className={styles.cardImg}>
                                        <img src={item.cardAldLogo}
                                             className={styles.cardLogo}
                                             alt='图片'/>
                                    </div>
                                    <div className={styles.cardTxt + ' clearfix'}>
                                        <h5 className={styles.interestsTitle}>
                                            {item.cardName}
                                        </h5>
                                        <p className={styles.highLight}>
                                            {item.title}
                                        </p>
                                        {item.keywords
                                        && item.keywords.length > 0
                                        && <div className={styles.keywordsW}>
                                            {item.keywords.map((item, index) =>
                                                <span key={index} className={styles.keywordsItem}>{item}</span>)}
                                        </div>}
                                    </div>
                                </a>
                            </li>;

                        })}

                    </ul>
                    {isLoop && <div className={styles.pagination + ' swiper-pagination'}></div>}
                </div>}
            </main>}</div>
        );
    }

}


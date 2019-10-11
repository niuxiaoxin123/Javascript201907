/**
 * @file 程序主入口 js
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions';
import * as commonActions from '../../actions';
import styles from './index.scss';
import Header from '../components/header';
import {Loading} from '../components/tip';
import LoanSection from '../components/loanSection';
import hyphenate from '../../common/js/hyphenate';

let loadXzhFile = false;
const xzhFromParam = 'xzh_wz';
const title = '文章详情';

class NewsDetail extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.actions.fetch(() => {
            // 获取推荐产品
            this.props.commonActions.fetchProductRecommend({
                productType: 'XD'
            });
        });
        hyphenate.setDocumentTitle(title);
    }

    componentDidUpdate() {
        let data = this.props.newsDetail.data;
        const jsonLd = data.jsonLd;
        const from = data.requestFrom;

        if (from === xzhFromParam && loadXzhFile === false) {
            if (jsonLd) {
                const jsonIdEle = document.createElement('div');
                jsonIdEle.innerHTML = jsonLd;
                document.body.appendChild(jsonIdEle.childNodes[0]);
            }

            const linkEle = document.createElement('link');
            linkEle.setAttribute('rel', 'canonical');
            linkEle.setAttribute('href', location.href);
            document.head.appendChild(linkEle);

            const msiteEle = document.createElement('script');
            msiteEle.setAttribute('src', '//msite.baidu.com/sdk/c.js?appid=1601252757021063');
            document.head.appendChild(msiteEle);
            loadXzhFile = true;
        }
    }

    componentWillUnmount() {
        // 清除文章详情页的缓存
        this.props.actions.clearArticleDetailCache();
    }

    render() {
        const newsDetail = this.props.newsDetail;
        let recommendLoan = this.props.commonState.recommendLoan;
        return (
            <div className={styles.wrapper}>
                {!newsDetail.endFetching && <Loading />}
                {!window.isInWallet && <Header title={title} />}
                {newsDetail.endFetching
                    && <div className={styles.content}>
                        {newsDetail.data.requestFrom === xzhFromParam && <script>cambrian.render('head')</script>}
                        <div className={styles.articleContent}>
                            <h1 className={styles.title}>{newsDetail.data.title}</h1>
                            <h6>百度信用卡中心 {newsDetail.data.modifyTime}</h6>
                            <article dangerouslySetInnerHTML={{__html: newsDetail.data.context}}></article>
                        </div>
                        {newsDetail.data.recommendList && this.renderRecommend(newsDetail.data.recommendList)}
                        {recommendLoan.endFetching
                            && <LoanSection loanList={recommendLoan.loanList} pageName='newsDetail' />}
                    </div>}
            </div>
        );
    }

    renderRecommend(list) {
        return (
            <div className={styles.listWrapper}>
                {list && list.length > 0 && <h2>极速办卡</h2>}
                <ul>
                    {list.map((item, index) => (
                        <li key={index} onClick={() => {
                            global.bdTrackEvent('newsdetail_recommendcard');
                        }}>
                            <a href={hyphenate.concatChnQuery('/creditserver/apply/redirect', item.url)}>
                                <img src={item.image} />
                                <div className={styles.detailWrapper}>
                                    <h5>{item.name}</h5>
                                    <p className={styles.detail}>{item.detail}</p>
                                    <p className={styles.info}>{item.applyNum}</p>
                                </div>
                                <p className={styles.apply}>详情</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    newsDetail: state.newsDetail,
    commonState: state.commonState
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
    commonActions: bindActionCreators(commonActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewsDetail);

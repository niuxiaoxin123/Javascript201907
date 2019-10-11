/**
 * @file 主题推荐 js
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2018/10/9
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions';
import styles from './index.scss';
import Header from '../components/header';
import TopicRecommend from '../components/topicRecommend';
import {Loading} from '../components/tip';
import hyphenate from '../../common/js/hyphenate';
let title = '';

class Topic extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
        this.props.actions.fetch();
        window.scrollTo(0, 0);
        hyphenate.setDocumentTitle(title);

    }
    componentDidUpdate() {
        let topicDetail = this.props.topicDetail;
        topicDetail.endFetching
            && topicDetail.content
            && topicDetail.content.topicTitle
            && (hyphenate.setDocumentTitle(topicDetail.content.topicTitle));
    }
    componentWillUnmount() {
        this.props.actions.fetch(true);
    }

    render() {
        const topicDetail = this.props.topicDetail;
        const topicId = hyphenate.getSearchString().topicId;
        return (
            <div className={styles.topicDetail}>
                {!topicDetail.endFetching && <Loading />}
                {topicDetail.endFetching
                    && <div className={styles.topicWrapper}>
                        {!window.isInWallet
                            && <Header
                                title={topicDetail.content && topicDetail.content.topicTitle || title} />}
                        {topicDetail.content
                            && <div className={styles.topicContent}>
                                {topicDetail.content.topicImgUrl
                                    && topicDetail.content.topicImgUrl.split(',').length > 0
                                    && topicDetail.content.topicImgUrl.split(',').map((item, index) =>
                                        <img alt='图片' src={item} key={index} />)}
                                {topicDetail.content.recommendList
                                    && <TopicRecommend
                                        listData={topicDetail.content.recommendList}
                                        title='热门卡片 极速办理'
                                        code={'topic_recommend_' + topicId} />}
                            </div>}
                        {/* : <div className={styles.downlinepage}>
                                <div className={styles.downlinecard}>
                                    <h3>
                                        <span><img src={downline} /></span>
                                        <p>很抱歉，该专题已经下线</p>
                                    </h3>
                                </div>
                            </div>} */}
                    </div>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    topicDetail: state.topicDetail
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Topic);
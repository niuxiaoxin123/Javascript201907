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
import {Loading} from '../components/tip';
import hyphenate from '../../common/js/hyphenate';

const title = '活动详情';

class ActivityDetail extends Component {
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
        // 清楚store中活动详情的数据
        this.props.actions.fetch(true);
    }

    render() {
        const activityDetail = this.props.activityDetail;

        return (
            <div className={styles.activityDetail}>
                {!activityDetail.endFetching && <Loading />}
                {activityDetail.endFetching
                    && activityDetail.detail
                    && <div className={styles.detailContent}>
                        {!window.isInWallet && <Header title={title} />}
                        <div className={styles.detailWrapper}>
                            {!window.isInWallet && <div className={styles.walletHole}></div>}
                            <h2>{activityDetail.detail.title}</h2>
                            <div className={styles.detailList}>
                                <h4>活动时间</h4>
                                <p>有效期: {activityDetail.detail.startDate} 至 {activityDetail.detail.endDate}</p>
                            </div>
                            <div className={`${styles.detailList} ${styles.context}`} dangerouslySetInnerHTML={{
                                __html: activityDetail.detail.content
                            }}>

                            </div>
                        </div>
                    </div>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    activityDetail: state.activityDetail
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActivityDetail);

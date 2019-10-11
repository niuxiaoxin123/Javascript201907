/**
 * @file 办卡进度查询页 js
 * @author renbaosen(renbaosen@baidu.com)
 * @date 2019/01/23
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions';
import * as commonActions from '../../actions';

import styles from './index.scss';
// import {Link} from 'react-router';
import Header from '../components/header';
import {Loading} from '../components/tip';
import hyphenate from '../../common/js/hyphenate';
import Swiper from '../components/swiper';
import Const from '../../common/constant/const';


const title = '申卡进度';

class applyCardSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        hyphenate.setDocumentTitle(title);
        // banner图请求
        this.props.commonActions.fetchBannerPic({cfgCode: Const.BANNER_CODE.applyCardSchedule});
        // 银行list数据请求
        this.props.actions.fetchIndex();


    }

    componentWillUnmount() {
        //  清空缓存
        this.props.actions.clearReducer();
        this.props.commonActions.fetchBannerCache();
    }

    trackUpload = index => {
        // 上报百度统计埋点
        global.bdTrackEvent('applycardschedule_bank_' + (index + 1));
    };

    render() {
        console.log(Const, 31);
        let applyCardSchedule = this.props.applyCardSchedule;
        let bankList = this.props.applyCardSchedule.bankList;
        let bannerList = this.props.commonState.mateList;
        return (<div className={styles.wrapper}>
            {!applyCardSchedule.endFetching ? <Loading/> : <div>
                {!(window.isInWallet || window.isBDMap) && <Header title={title}/>}
                {bannerList.length > 0 && <Swiper bannerList={bannerList}
                                                  code='applycardschedule_banner'
                                                  swiperId='#public-swiper-container'
                                                  paginationName='applyCardPagination'
                                                  height='3.22'
                />}
                {bankList.length > 0 && <div className={styles.bankList + ' clearfix'}>
                    <div className={styles.bankListTitle}>建议提交申请材料7个工作日后查询</div>
                    {bankList.map((item, index) => (
                        <li key={index}
                            onClick={this.trackUpload.bind(this, index)}>
                            <a href={hyphenate.concatChnQuery(item.processUrl)}>
                                <img src={item.logoUrl} alt=''/>
                                <p>{item.bankName}</p>
                            </a>
                        </li>
                    ))}
                </div>}
            </div>}
        </div>);
    }
}

const mapStateToProps = state => ({
    applyCardSchedule: state.applyCardSchedule,
    commonState: state.commonState
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
    commonActions: bindActionCreators(commonActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(applyCardSchedule);

/**
 * @file 用卡知识页面 js
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions';
import styles from './index.scss';
import Pager from '../components/pager';
import Header from '../components/header';
import {Link} from 'react-router';
import TabBar from '../components/TabBar';
import KnowledgeItem from '../components/knowledgeItem';
import {Loading} from '../components/tip';
import hyphenate from '../../common/js/hyphenate';

const title = '用卡知识';

class CardUseKnowledge extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.actions.fetch();
        hyphenate.setDocumentTitle(title);
    }
    pagerHanderLoad = info => {
        let vm = this;
        let knowledgeList = vm.props.knowledgeList;
        vm.props.actions.fetch({
            pageNo: ++knowledgeList.paginator.pageNo
        }, info);
    }

    render() {
        const knowledgeList = this.props.knowledgeList;
        return (
            <div className={styles.konwlgWrapper}>
                {!knowledgeList.endFetching && <Loading />}
                {knowledgeList.endFetching && <div>
                    {!window.isInWallet && <Header title={title} noIcon={true}/>}
                    {(knowledgeList.list && knowledgeList.list.length)
                        ? <div className={!window.isInWallet && styles.articleListPaper}>
                            <Pager onLoad={this.pagerHanderLoad} user='articleList'
                                firstPaginator={knowledgeList.paginator}>
                                <div className={!window.isInWallet ? styles.walletHole : styles.hole}></div>
                                <ul className={styles.knowledgeList}>
                                    {knowledgeList.list && knowledgeList.list.map((item, index) => (
                                        <KnowledgeItem data={item} key={index} />
                                    ))}
                                </ul>
                            </Pager>
                        </div>
                        : <div className={styles.noKnowlge + ' flex'}>
                            <p>暂无文章</p>
                        </div>}
                    <TabBar />
                </div>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    commonState: state.commonState,
    knowledgeList: state.knowledgeList
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardUseKnowledge);

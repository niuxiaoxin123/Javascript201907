/**
 * @file 程序主入口 js
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions';
import * as pagerActions from '../components/pager/actions';
import styles from './index.scss';
import Select from '../components/filter';
import Pager from '../components/pager';
import Header from '../components/header';
import {Loading} from '../components/tip';
import hyphenate from '../../common/js/hyphenate';
// import EventUpload from '../../common/js/eventUpload';
import CardItem from '../components/cardItem';

const title = '百度信用卡中心';

class TelList extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        hyphenate.setDocumentTitle(title);
        let listCache = this.props.listCache
            && this.props.listCache.data
            && this.props.listCache.data.cardListDataCache;
        if (listCache) {
            this.props.actions.updateCardListData(JSON.parse(listCache));
        }
        else {
            this.props.actions.fetch();
        }
    }

    componentWillUnmount() {
        let cardList = this.props.cardList;
        this.props.pagerActions.listCache({
            cardListDataCache: JSON.stringify(cardList)
        });
    }

    pagerHanderLoad = info => {
        let vm = this;
        let cardList = vm.props.cardList;
        vm.props.actions.fetch({
            pageNo: ++cardList.paginator.pageNo
        }, info);
    }

    // 每次筛选时将滚动区域滚动条位置置为0
    scrollTo0 = () => {
        let pagerArea = document.querySelector('.' + styles.cardList);
        pagerArea && (pagerArea.parentNode.scrollTop = 0);
        this.props.pagerActions.listCache({
            cardListScrollTop: 0
        });
        this.props.actions.updateCardListData({}, true);
    }
    // 筛选框选中后的点击事件
    selectCb = selectData => {
        this.scrollTo0();
        this.props.actions.fetch(selectData, null, true);
    }

    render() {
        const cardList = this.props.cardList;
        // let searchObj = hyphenate.getSearchString();

        return (
            <div className={styles.wrapper}>
                {!cardList.endFetching && <Loading/>}
                {cardList.endFetching && <div>
                    {!(window.isInWallet || window.isBDMap) && <Header title={title}/>}
                    <Select filter={cardList.filter}
                        selectList={cardList.selectList}
                        actions={this.props.actions}
                        callback={this.selectCb}
                        clearPosCache={this.props.pagerActions.listCache}
                        idCode='cardlist_selecttab'/>
                    {cardList.list && cardList.list.length ? <Pager
                        onLoad={this.pagerHanderLoad}
                        user='cardList'
                        firstPaginator={cardList.paginator}>
                        <div className={(window.isInWallet || window.isBDMap)
                            ? styles.walletHole : styles.hole}></div>
                        <ul className={styles.cardList}>
                            {cardList.list.map((item, index) =>
                                <CardItem key={index}
                                    itemData={item}
                                    query={`path=${hyphenate.ctPath()}}`}
                                    trackIdCode={'cardlist_card'}/>
                            )}
                        </ul>
                    </Pager>
                        : <div className={styles.noCard}>
                            <div className={styles.imgWrap}>
                                <p>此类目下暂无信用卡</p>
                            </div>
                        </div>}
                </div>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    cardList: state.cardList,
    listCache: state.listCache
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
    pagerActions: bindActionCreators(pagerActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TelList);

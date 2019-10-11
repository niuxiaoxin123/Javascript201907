/**
 * @file 保险产品列表
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2019/5/30
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import * as actions from './actions';
import * as commonActions from '../../actions';

import styles from './index.scss';
import Header from '../components/header';
import ModuleTitle from './component/moduleTitle';
import ProductItem from './component/productItem';
import {Loading} from '../components/tip';
import NoData from '../components/noData';
import TabBar from '../components/TabBar';
import hyphenate from '../../common/js/hyphenate';

const title = '保险产品';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: hyphenate.getSearchString().tab - 0 || 0,
            listShow: true
        };
    }

    componentWillMount() {
        hyphenate.setDocumentTitle(title);
        // 产品list数据请求
        this.props.actions.fetchProductList();

    }

    componentWillUnmount() {
        //  清空缓存
        this.props.actions.clearProductListReducer();
    }

    render() {
        let {
            productListData,
            endFetching
        } = this.props.productListReducer;
        let {
            bannerList,
            productList
        } = productListData;
        let {
            current,
            listShow
        } = this.state;
        return endFetching
            ? <div className={styles.wrapper}>
                {window.isInWallet
                    && <Header title={title} />}
                {bannerList.length > 0
                    && <div className={styles.bannerList}>
                        <a href={bannerList[0].jumpUrl
                            && hyphenate.concatChnQuery(bannerList[0].jumpUrl)
                            || 'javascript:void(0);'}>
                            <img src={bannerList[0].image} />
                        </a>
                    </div>}
                {productList && productList.length > 0
                    ? <div className={styles.listContainer}>
                        {/* tab切换 */}
                        <ul className={styles.tabsList}>
                            {productList
                                && productList.length > 0
                                && productList.map((item, index) => (
                                    <li key={index}
                                        className={current === index ? styles.active : styles.tablist}
                                        onClick={this.itemNav.bind(this, index)}>
                                        <span>{item.tabName}</span>
                                    </li>
                                ))}
                        </ul>
                        <ul className={styles.products}>
                            {listShow
                                && productList[current].insuranceList
                                && productList[current].insuranceList.length > 0
                                && productList[current].insuranceList.map((insuranceItem, insuranceIdex) =>
                                    <li key={insuranceIdex} className={styles.sectionWrapper}>
                                        <ModuleTitle title={insuranceItem.insuranceName} />
                                        {insuranceItem.list
                                            && insuranceItem.list.length > 0
                                            && insuranceItem.list.map((productDetail, idx) =>
                                                <ProductItem productDetail={productDetail}
                                                    key={idx}
                                                    insuranceType={insuranceItem.insuranceType}
                                                    commonActions={this.props.commonActions} />)}
                                    </li>)}
                        </ul>
                    </div>
                    : <NoData title='暂无产品' />}

                {/* tab-bar */}
                {!window.isInWallet
                    && <div className={styles.centerBottom}>
                        <TabBar/>
                    </div>}
            </div>
            : <Loading />;
    }
    //  切换tab
    itemNav = index => {
        this.setState({
            current: index,
            // 先隐藏后显示--修复标签省略后无法重置
            listShow: false
        }, () => {
            this.setState({
                listShow: true
            });
        });
        // 保留切换的tab索引，用于tab回显
        // hyphenate.setSearchString({
        //     ...hyphenate.getSearchString(),
        //     tab: index
        // });
        // 上报百度统计埋点
        global.bdTrackEvent('productlist_crowd_' + (index + 1));
    }
}

const mapStateToProps = state => ({
    productListReducer: state.productListReducer
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
    commonActions: bindActionCreators(commonActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);
/**
 * @file 优惠商户列表页 js
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2018/10/25
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions';
import * as commonActions from '../../actions';
import * as pagerActions from '../components/pager/actions';
import styles from './index.scss';
import Filter from '../components/filter';
import Pager from '../components/pager';
import TabBar from '../components/TabBar';

import {Loading} from '../components/tip';
import hyphenate from '../../common/js/hyphenate';
import StoreItem from '../components/storeItem';
import TitleBar from '../components/titleBar';
import CitySelect from '../components/citySelect';
import BMapLocation from '../../common/js/bMapLocation';
import {pick} from 'lodash';
let mapAccuracy = null; // 获取定位的精度

const title = '优惠列表';
class StoreList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityShow: false
        };
        this.search = {}; // url的search参数
    }

    componentWillMount() {
        hyphenate.setDocumentTitle(title);
        hyphenate.setSearchString({
            ...pick(hyphenate.getSearchString(), global.CONSTS.CONFIG_DATA.validKeys),
            ...window.storeListSearchCache
        });
    }
    componentWillUnmount() {
        let storeList = this.props.storeList;
        this.props.pagerActions.listCache({
            storeListDataCache: JSON.stringify(storeList)
        });
        // 存储url ？后面的参数 切换tab时不刷新页面
        window.storeListSearchCache = this.search;
        // 清除定时器
        this.mapTimer && clearTimeout(this.mapTimer);
    }
    componentDidMount() {
        let vm = this;
        // 拿缓存
        let listCache = vm.props.listCache
            && vm.props.listCache.data
            && vm.props.listCache.data.storeListDataCache;
        let listJson = listCache && JSON.parse(listCache);
        if (listCache
            && listJson.endFetching
            && listJson.list
            && listJson.list.length > 0
            && window.storeListSearchCache.city) {
            // 缓存数据存在并且非空
            vm.updateData(JSON.parse(listCache), false);
        } else {
            let mapReturn = false;
            let initLocation = {
                address: {
                    city: ''
                },
                point: {
                    lng: '',
                    lat: ''
                }
            };
            // 获取地理定位 lng经度 lat纬度
            BMapLocation(res => {
                if (res.accuracy !== null) {
                    mapAccuracy = res.accuracy;
                    vm.fetchList(res);
                } else {
                    !mapReturn && vm.fetchList(res);
                }
                mapReturn = true;
            }, err => {
                !mapReturn && vm.fetchList(initLocation);
                mapReturn = true;
            });

            vm.mapTimer = setTimeout(() => {
                !mapReturn && vm.fetchList(initLocation);
                mapReturn = true;
            }, 500);
        }

        // vm.getBMapLocaton()
        //     .then(res => {
        //         alert(JSON.stringify(res));
        //         if (res.accuracy || res.accuracy > 0) {

        //         }
        //         console.log('get location success', res);
        //         vm.fetchList(res);
        //     })
        //     .catch(() => {
        //         console.log('get location error');
        //         vm.fetchList(initLocation);
        //     });
    }

    getBMapLocaton = () => {
        let vm = this;
        return new Promise(function (resolve, reject) {
            BMapLocation(res => {
                resolve(res);
            }, err => {
                resolve(err);
            });

            vm.mapTimer = setTimeout(() => {
                reject();
            }, 500);
        });

    }
    // 获取数据
    fetchList = res => {
        let vm = this;
        let lng = res.point.lng;
        let lat = res.point.lat;
        let city = res.address.city;
        let local = city;
        vm.props.actions.fetch({
            city: res.address.city,
            lng,
            lat,
            local,
            ...window.storeListSearchCache
        }, null, true, true, mapAccuracy);
    }
    // 滚动加载
    pagerHanderLoad = info => {
        let vm = this;
        let storeList = vm.props.storeList;
        let pageNo = ++storeList.paginator.pageNo;
        vm.props.actions.fetch({
            pageNo,
            ...(hyphenate.getSearchString().city ? {} : window.storeListSearchCache)
        }, info, false, false, vm.isLocationCity());
    }
    // 是否是当前定位城市
    isLocationCity = citiChose => {
        let searchObj = hyphenate.getSearchString();
        let isLocationCity = searchObj.local === searchObj.city;
        if (citiChose) {
            isLocationCity = searchObj.local === citiChose.cityName;
        }
        return isLocationCity ? mapAccuracy : null;
    }
    // 每次筛选时将滚动区域滚动条位置置为0
    scrollTo0 = selectData => {
        let pagerArea = document.querySelector('.' + styles.storeList);
        pagerArea && (pagerArea.parentNode.scrollTop = 0);
        // this.props.actions.fetch(selectData, null, null, true);
        this.props.pagerActions.listCache({
            storeListScrollTop: 0
        });
        this.updateData({}, true);
    }
    modalCb = selectData => {
        this.scrollTo0();
        this.props.actions.fetch(selectData, null, null, true, this.isLocationCity());
    }

    // 更新缓存数据到redux里的storeList
    updateData = (data, clear) => {
        this.props.actions.updateStoreListData(data, clear, mapAccuracy);
    }

    render() {
        const storeList = this.props.storeList;
        let cityShow = this.state.cityShow;
        this.search = hyphenate.getSearchString();

        return (
            <div className={styles.storeListWrapper}>
                {!storeList.endFetching && <Loading />}
                <TitleBar fixedTop={true}
                isZPBug = {window.isZPBug}
                >
                    <div className={styles.location}
                        onClick={this.showCityList}>
                        <span>{hyphenate.getSearchString().city || ''}</span>
                        <p><i className='iconfont'>&#xe636;</i></p>
                    </div>
                </TitleBar>
                {cityShow
                    && <CitySelect
                        user='storelist'
                        show={this.showCityList}
                        hide={this.hideCityList}
                        cityChoose={this.cityChoose}
                        locationCity={hyphenate.getSearchString().local} />}

                {storeList.endFetching
                    && <div className={styles.storeListPager}>
                        <Filter filter={storeList.filter}
                            selectList={storeList.selectList}
                            actions={this.props.actions}
                            callback={this.modalCb}
                            clearPosCache={this.props.pagerActions.listCache}
                            idCode='storelist_selecttab'
                            user='storeListFilter' />
                        {storeList.list
                            && storeList.list.length
                            ? <Pager
                                onLoad={this.pagerHanderLoad}
                                user='storeList'
                                firstPaginator={storeList.paginator}>
                                <div className={styles.hole}></div>
                                <ul className={styles.storeList}>
                                    {storeList.list.map((item, index) =>
                                        <StoreItem key={index}
                                            itemData={item}
                                            query={`path=${hyphenate.ctPath()}}`}
                                            mapAccuracy={storeList.mapAccuracy}
                                            trackIdCode='storelist_store' />)}
                                </ul>
                            </Pager>
                            : <div className={styles.noCard}>
                                <div className={styles.imgWrap}>
                                    <p>此类目下暂无商户</p>
                                </div>
                            </div>}

                    </div>}
                <TabBar />
            </div>
        );
    }
    // 显示城市列表
    showCityList = () => {
        this.setState({
            cityShow: true
        });
        global.bdTrackEvent('storelist_switchcity')
    }
    // 隐藏城市列表弹窗
    hideCityList = () => {
        this.setState({
            cityShow: false
        });
    }
    // 选择城市
    cityChoose = cityChose => {
        this.hideCityList();
        this.scrollTo0();
        this.props.actions.fetch({
            city: cityChose.cityName
        }, null, true, true, this.isLocationCity(cityChose));
        console.log('选择的城市', cityChose, this.props);
    }
}

const mapStateToProps = state => ({
    storeList: state.storeList,
    listCache: state.listCache,
    commonState: state.commonState

});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
    commonActions: bindActionCreators(commonActions, dispatch),
    pagerActions: bindActionCreators(pagerActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StoreList);

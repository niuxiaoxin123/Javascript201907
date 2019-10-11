/**
 * @file 城市选择
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2018/10/29
 */

import React, {Component} from 'react';
import styles from './index.scss';
import * as actions from './actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import OpenItem from './openItem';
import Header from '../header';
import array from 'lodash/array';

class CitySelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationCity: '北京市'
        };
    }
    componentDidMount() {
        // 已经有列表数据了就不请求接口了
        if (!this.props.cityData.endFetching) {
            this.props.actions.fetch();
        }
    }

    render() {
        let {
            cityData,
            locationCity,
            user
        } = this.props;
        return <div className={styles.cityW}>
            <Header title='选择城市'
                back={this.props.hide}>
            </Header>
            {cityData.endFetching && <div className={styles.cityContent}>
                <h4 className={styles.cityTitle}>当前定位城市</h4>
                <div className={styles.location}>
                    <span onClick={this.cityChoose.bind(this, {
                        cityCode: 'init',
                        cityName: locationCity
                    }, 'localcity')}>{locationCity}</span>
                </div>
                <h4 className={styles.cityTitle}>热门城市</h4>
                <ul className={styles.hotCityList + ' clearfix'}>
                    {cityData.data.hotCity
                        && cityData.data.hotCity.length > 0
                        && cityData.data.hotCity.map((item, index) =>
                            <li key={index} onClick={this.cityChoose.bind(this, item, 'hotcity')}>{item.cityName}</li>)}
                </ul>
                <h4 className={styles.cityTitle}>全部城市</h4>
                <div className={styles.allCity + ' clearfix'}>
                    {this.renderCityList(cityData.data.cityList || []).map((item, index) =>
                        <OpenItem key={index} index={index} openData={item} {...this.props}
                            cityChooseHandle={this.cityChoose}
                            user={user}/>)}
                </div>
            </div>}
        </div>;
    }

    // 渲染全部城市列表--处理城市数据--5个为一组
    renderCityList(listData = []) {
        // let dataArr = [];
        // listData.map((item, index) => {
        //     if (index % 5 === 0) {
        //         dataArr[index / 5] = [];
        //     }
        //     dataArr[parseInt(index / 5)].push(item);
        // });
        return array.chunk(listData, 5);
    }

    // 城市选择埋点
    cityChoose = (cityData, trackId) => {
        this.props.cityChoose(cityData);
        global.bdTrackEvent(this.props.user + '_' + trackId);
    }
}

const mapStateToProps = state => ({
    cityData: state.cityData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CitySelect);
/**
 * @file 城市组--5个字母为1组--后面跟一个列表ul默认不展开
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2018/10/29
 */

import React, {Component} from 'react';
import styles from './index.scss';
import * as actions from './actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class OpenItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemIndex: -1 // 默认当前点击的字母的索引值
            // openShow: false // 默认当前被点击字母下的城市列表是否显示
        };
    }

    componentWillUnmount() {
        this.props.actions.fetch(-1, false);
    }


    // 点击字母-展开当前字母下的城市列表
    itemClick(index) {
        this.props.actions.fetch(this.props.index, false, index);
        this.setState({
            itemIndex: index
        });
        global.bdTrackEvent(this.props.user + '_cityletter');
    }

    // 点击展开列表的城市--回传给父组件城市信息
    cityClick(item) {
        this.props.cityChooseHandle(item, 'allcity');
    }

    render() {
        let openData = this.props.openData;
        let itemIndex = this.state.itemIndex;
        return <div className={styles.groupCity + ' clearfix'}>
            <ul className={styles.pinyinList}>
                {openData.map((item, index) =>
                    <li key={index} onClick={this.itemClick.bind(this, index)}>
                        <span className={this.props.cityData.itemIndex === index
                            && this.props.cityData.index === this.props.index ? styles.select : ''}>
                            {item.initials}
                        </span>
                    </li>)}
                {/* {this.props.addLi(openData.length, 5).map((item, index) =>
                    <li key={index}></li>)} */}
            </ul>
            {(this.props.cityData.index === this.props.index) && <ul className={styles.openList}>
                {openData[itemIndex].list.map((item, index) => <li key={index}
                    onClick={this.cityClick.bind(this, item)}>{item.cityName}</li>)}
            </ul>}
        </div>;
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
)(OpenItem);

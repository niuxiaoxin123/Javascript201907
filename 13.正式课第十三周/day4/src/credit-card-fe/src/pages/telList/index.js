/**
 * @file 程序主入口 js
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions';
import styles from './index.scss';
import Header from '../components/header';
import {Loading} from '../components/tip';
import hyphenate from '../../common/js/hyphenate';

const title = '客服中心';

class TelList extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.actions.fetch();
        hyphenate.setDocumentTitle(title);
    }

    render() {
        const telList = this.props.telList;

        return (
            <ul className={styles.list}>
                {!window.isInWallet && <Header title={title}/>}
                {!telList.endFetching && <Loading/>}
                {telList.endFetching
                && telList.list.map((item, index) => (
                    <li key={index}>
                        <p className='flex'>
                            <img src={item.icon}/>
                            <span>{item.bankNameCh}</span>
                            <i className={styles.tag}>信用卡中心</i>
                        </p>
                        <a href={'tel:' + item.serviceTel}
                            onClick={() => {global.bdTrackEvent('tellist_tel')}}>
                            <i className={'iconfont ' + styles.telIcon}>&#xe627;</i>
                        </a>
                    </li>
                ))}
            </ul>
        );
    }
}

const mapStateToProps = state => ({
    telList: state.telList
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TelList);

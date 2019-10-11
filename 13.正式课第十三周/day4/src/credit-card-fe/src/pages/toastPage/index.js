/**
 * @file 程序主入口 js
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2018/6/27
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styles from './index.scss';
import Header from '../components/header';
import hyphenate from '../../common/js/hyphenate';
import defaultImg from '../../common/imgs/default.png';
import browser from '../../common/js/browser';
import * as actions from './actions';
let searchObj = hyphenate.getSearchString();
const title = '跳转中';
class ToastPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            jumpUrl: ''
        };
    }
    componentWillMount() {
        let vm = this;
        if (browser.versions().mobile) {
            let ua = navigator.userAgent.toLowerCase(); // 获取判断用的对象
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                vm.setState({
                    title: hyphenate.setDocumentTitle(title)
                });
            }
            else {
                vm.setState({
                    title: <Header title={title} noIcon={true} />
                });
            }
        }
    }
    componentDidMount() {
        hyphenate.setDocumentTitle(title);
        this.props.actions.fetch(res => {
            this.setState({
                jumpUrl: res.jumpUrl
            });
            // 替换当前历史记录
            setTimeout(() => {
                location.replace(res.jumpUrl);
            }, 1500);
        });
    }

    render() {
        return (
            <div className={`${styles.centerPageWrapper} ${isPC ? styles.mailWrapper : null}`}>
                {!window.isInWallet && this.state.title}
                <div className={`${styles.content} ${isPC ? styles.mailContent : null}`}>
                    <img src={searchObj.jumpLogoUrl || searchObj.logo || defaultImg} />
                    <p className={styles.desc}>正在跳转机构官网页面</p>
                    {searchObj.slogan && <p className={styles.slogan}>{searchObj.slogan}</p>}
                </div>
                {this.state.jumpUrl
                    && <p className={styles.link}>如果浏览器未正常跳转，请<a href='javascript:;'
                        onClick={this.clickHere}>点击这里</a></p>}
            </div>
        );
    }
    clickHere() {
        location.replace(this.state.jumpUrl);
    }
}

const mapStateToProps = state => ({
    // topicDetail: state.topicDetail
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ToastPage);
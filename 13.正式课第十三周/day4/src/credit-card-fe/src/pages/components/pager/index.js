/**
 * @file 上滑翻页组件
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/26
 */

import React, {Component} from 'react';
import styles from './index.scss';
import * as actions from './actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
let ticking = false;

class Pager extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.state = {
            fail: false,
            success: false,
            complete: false,
            loading: false
        };
    }
    componentDidMount() {
        let scrollTop = this.props.listCache
            && this.props.listCache.data
            && this.props.listCache.data[this.props.user + 'ScrollTop'];
        if (this.pagerContent) {
            this.pagerContent.scrollTop = scrollTop || 0;
        }
        // 判断首屏是否加载完成-使用父组件传输过来的分页器判断----改成了首页不显示,注释
        // let paginator = this.props.firstPaginator;
        // paginator && paginator.pageNo === paginator.totalPage
        //     && this.info().complete();
    }
    componentWillUnmount() {
        if (this.pagerContent) {
            let kv = {};
            kv[this.props.user + 'ScrollTop'] = this.pagerContent.scrollTop;
            this.props.actions.listCache(kv);
        }
    }
    handleScroll(e) {
        let vm = this;
        let wrapper = e.target;

        if (!ticking && vm.state.loading === false && vm.state.complete === false) {
            requestAnimationFrame(() => {
                if (vm.needLoadMore(wrapper)) {
                    vm.setState({
                        loading: true
                    });
                    vm.props.onLoad.call(null, vm.info());
                }
                ticking = false;
            });
            ticking = true;
        }
        // const clientHeight = event.target.clientHeight
        // const scrollHeight = event.target.scrollHeight
        // const scrollTop = event.target.scrollTop
        // const isBottom = (clientHeight + scrollTop === scrollHeight)
        // if (this.state.isScrollBottom !== isBottom) {
        //     this.setState({
        //         isScrollBottom: isBottom
        //     })
        // }
    }

    info() {
        const vm = this;
        let info = {
            fail: (fail = true) => vm.setState({
                fail,
                loading: false
            }),
            success: (success = true) => vm.setState({
                success,
                loading: false
            }),
            complete: (complete = true) => vm.setState({
                complete,
                loading: false
            })
        };

        return info;
    }

    needLoadMore(wrapper) {
        let scrollHeight = wrapper.scrollHeight;
        let scrollTop = wrapper.scrollTop;
        let viewportHeight = Math.max(wrapper.clientHeight, wrapper.innerHeight || 0);

        // 当剩余高度不足半屏时即开始加载
        if (viewportHeight * 2 + scrollTop >= scrollHeight) {
            return true;
        }

        return false;
    }

    render() {
        return <div
            onScroll={e => this.handleScroll.call(this, e)}
            className={styles.pager}
            id={this.props.user + 'Pager'}
            ref={node => this.pagerContent = node}>
            {this.props.children}
            <div className={styles.pagerTips}>
                {this.state.loading
                    && <div>
                        <i className={'iconfont ' + styles.tipsAnimation}>&#xe6b0;</i>
                        {this.props.loadingText || '努力加载中...'}</div>}
                {this.state.complete && <p>{this.props.completeText || '已全部加载~'}</p>}
                {this.state.fail && <p>{this.props.failText || '加载失败~'}</p>}
            </div>
            {this.props.footer}
        </div>;
    }
}

const mapStateToProps = state => ({
    listCache: state.listCache
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pager);
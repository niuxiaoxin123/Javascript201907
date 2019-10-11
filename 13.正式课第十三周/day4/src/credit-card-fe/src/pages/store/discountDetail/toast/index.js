/**
 * @file 弹窗提示 js
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2019-1-3
 */
import React, {Component} from 'react';
import styles from './index.scss';

export default class Toast extends Component {
    componentDidMount() {
        let vm = this;
        vm.timer = setInterval(() => {
            let currentTime = --vm.props.options.time;
            if (currentTime <= 0) {
                clearInterval(vm.timer);
                vm.props.complete();
            }
        }, 1000);
    }
    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

    render() {
        let options = this.props.options;
        return <div className={styles.toastMain}>
            <i className={styles[options.iconType] + ' iconfont'}></i>
            <p>{options.title || ''}</p>
        </div>;
    }
}

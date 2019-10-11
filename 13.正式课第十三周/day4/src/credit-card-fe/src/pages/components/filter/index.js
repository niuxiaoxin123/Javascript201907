/**
 * @file 选择组件
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */

import React, {Component} from 'react';
import List from './list';
import styles from './index.scss';

export default class Select extends Component {
    constructor(props) {
        super(props);
    }

    showModal(index) {
        global.bdTrackEvent(this.props.idCode + '_' + (index + 1));
        let vm = this;
        vm.index = index;
        vm.props.actions.showModal(vm.props.filter, index);
    }

    hideMode() {
        this.props.actions.showModal(this.props.filter);
    }

    select = item => {
        let vm = this;
        let key = vm.props.filter[vm.index].key;
        let data = {};
        data[key] = item.code;
        // data.pageNo = 1;
        vm.props.callback(data);
    }

    render() {
        let {
            filter,
            selectList,
            idCode,
            user
        } = this.props;
        return <div className={styles[user]}>
            <ul className={(window.isInWallet || window.isBDMap)
                ? styles.walletTab + ' ' + styles.selectTab
                : styles.selectTab}>
                {filter.map((item, index) => (
                    <li key={index} onClick={() => this.showModal.call(this, index)}
                        id={idCode + '_' + (index + 1)}>
                        <div className={item.showModal ? styles.tabSelect : ""}>
                            {item.label}
                            {item.showModal ? <i className={'iconfont ' + styles.icon}>&#xe70f;</i>
                                : <i className={'iconfont ' + styles.icon}>&#xe710;</i>}
                        </div>
                    </li>
                ))}
            </ul>
            {filter.some(item => (item.showModal))
                && <List list={selectList}
                    select={this.select}
                    hideMode={() => this.hideMode.call(this)} />}
        </div>;
    }
}

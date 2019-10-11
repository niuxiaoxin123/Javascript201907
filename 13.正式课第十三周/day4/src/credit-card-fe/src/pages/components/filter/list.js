/**
 * @file 选择组件
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2018/10/31
 */
import React, {Component} from 'react';
import styles from './index.scss';

export default class List extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(newProps, newState) {
        this.modal.scrollTop = 0;
    }
    render() {
        let {
            hideMode,
            list,
            select
        } = this.props;
        return (
            <div className={(window.isInWallet || window.isBDMap)
                    ? styles.walletModal + ' ' + styles.Modal
                    : styles.Modal}
                onClick={hideMode}>
                <ul ref={modal => this.modal = modal}>
                    {list
                        && list.map((item, index) =>
                            <li key={index}
                                onClick={() => {
                                    item.isSelected ? false : select(item);
                                    return false;
                                }}>
                                {item.name}
                                {item.isSelected
                                    && <i className={'iconfont ' + styles.selected}>&#xe63a;</i>}
                            </li>
                        )}
                </ul>
            </div>
        );
    }
}

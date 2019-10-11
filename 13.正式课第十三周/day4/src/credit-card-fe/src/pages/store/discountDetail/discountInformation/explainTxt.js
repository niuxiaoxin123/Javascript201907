/**
 * @file 优惠详情纯文本部分 js
 * @author v_zhangxiaoran(v_zhangxiaoran@baidu.com)
 * @date 2018/10/29
 */
import React, {Component} from 'react';
import styles from './index.scss';
import array from 'lodash';
import Spread from '../../../components/spread';

export default class ExplainTxt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: true,
            overflow: false
        };
    }
    componentDidMount() {
        // 一行是0.58rem
        let baseHeight = 3.48 * rem;
        let eleHeight = this.explainTxt.offsetHeight;
        if (eleHeight > baseHeight) {
            this.setState({
                hide: true,
                overflow: true
            });
        } else {
            this.setState({
                hide: false,
                overflow: false
            });
        }
    }
    // 展开
    showMore = () => {
        this.setState({
            hide: false
        });
        this.props.trackEventUpload('showmore');
    }
    // 收起
    hideMore = () => {
        let index = this.props.index;
        this.setState({
            hide: true
        });
        this.scrollToAnchor('explainTxt' + (index + 1));
        this.props.trackEventUpload('hidemore');
    }
    // 锚点滚动
    scrollToAnchor = anchorName => {
        if (anchorName) {
            let anchorElement = document.getElementById(anchorName);
            if (anchorElement) {
                anchorElement.scrollIntoView();
            }
        }
    }
    render() {
        let {
            explain,
            title,
            index
        } = this.props;
        let {
            hide,
            overflow
        } = this.state;
        let dropExplain = array.drop(explain);
        let height = overflow && hide ? (3.48 * rem) : null;
        let overflowStyle = hide ? 'hidden' : 'visible';
        return (
            <li>{title}
                <p dangerouslySetInnerHTML={{
                    __html: explain[0]
                }}></p>
                <div ref={explainTxt => this.explainTxt = explainTxt}
                    style={{
                        height: height,
                        overflow: overflowStyle
                    }}>
                    {dropExplain.map((item, index) =>
                        <p key={index} dangerouslySetInnerHTML={{
                            __html: item
                        }}></p>
                    )}
                </div>

                {/* 必须要嵌套一层 否则点击卡顿 原因待查  */}
                <div className={styles.spreadW}>
                    <Spread
                        show={overflow && hide}
                        hide={!hide && overflow}
                        showHandle={this.showMore}
                        hideHandle={this.hideMore}
                        idCode='storedetail'
                        index={index} />
                </div>
                {overflow && <div className={styles.spreadHole}></div>}
            </li>
        );
    }
}
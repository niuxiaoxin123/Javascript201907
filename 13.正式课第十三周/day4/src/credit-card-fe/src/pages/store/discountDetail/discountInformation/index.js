/**
 * @file 优惠内容组件 js
 * @author v_zhangxiaoran(v_zhangxiaoran@baidu.com)
 * @date 2018/10/29
 */
import React, {Component} from 'react';
import styles from './index.scss';
import discount from '../../../../common/imgs/discount.png';
import editImg from '../../../../common/imgs/edit.png';
import ExplainTxt from './explainTxt';
// import hyphenate from '../../../../common/js/hyphenate';


export default class DiscountInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            destroyEle: true
        };
    }

    componentWillReceiveProps(newProps) {
        if (newProps.current !== this.props.current) {
            // 为了销毁子组件ExplainTxt 保证重新计算文本内容高度
            this.setState({
                destroyEle: false
            }, () => {
                this.setState({
                    destroyEle: true
                });
            });
        }
    }

    render() {
        let {
            information,
            index,
            trackEventUpload,
            bannerList,
            bankCode,
            bankTabBannerUv
        } = this.props;
        let {
            destroyEle
            // correctModalShow
        } = this.state;
        return (
            <div className={styles.main}>
                <div className={styles.information}>
                    {/* 锚点位置 */}
                    <div id={'explainTxt' + (index + 1)}
                         className={window.isInWallet
                             ? `${styles.anchorPoint} ${styles.anchorPointInWallet}`
                             : styles.anchorPoint}></div>
                    <ul className={styles.list}>
                        <li>
                            <div className={styles.title}>
                                <img src={discount} className={styles.activityLogo}/>
                                <span className={styles.discountTips}>优惠</span>
                                <img src={editImg} className={styles.uploadError}
                                     onClick={this.getCorrectList.bind(this, information)}/>
                            </div>
                        </li>
                        <li>
                            <span className={styles.titles}>{information.title}</span>
                        </li>
                        <li>有效期<p className={styles.time}>{information.endDate}</p></li>
                        {destroyEle
                        && information.term.explain
                        && information.term.explain.length > 0
                        && <ExplainTxt explain={information.term.explain}
                                       title={information.term.title}
                                       index={index}
                                       trackEventUpload={trackEventUpload}/>}
                    </ul>
                </div>
                {index === 0 && bannerList.length > 0
                && <div className={styles.bannerList}
                        onClick={this.props.bankTabBannerUv.bind(this, {btnId: 'creditcard_discountdetail_appbanner'}, bannerList[0].jumpUrl)}>
                    {/* <a href = {hyphenate.concatChnQuery(bannerList[0].jumpUrl)}> */}
                    <img src={bannerList[0].image}/>
                    {/* </a> */}
                </div>}
            </div>
        );
    }

    // 获取纠错列表
    getCorrectList = offerInfo => {
        // 请求纠错选项列表接口
        this.props.actions.fetchCorrectionList({
            cfgCode: this.props.cfgCode
        }, res => {
            let content = res.content;
            if (content.correctionList && content.correctionList.length > 0) {
                this.props.showCorrectModal({
                    ...content,
                    offerCode: offerInfo.offerCode
                });
            }
            else {
                console.log('获取纠错选项列表失败');
            }
        });
        this.props.trackEventUpload('correctbtn');
    }
};
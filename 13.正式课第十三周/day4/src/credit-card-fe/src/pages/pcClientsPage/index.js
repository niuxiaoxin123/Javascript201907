/**
 * @file 程序主入口 js
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/28
 */

import React, {Component} from 'react';
import styles from './index.scss';

import erweima from './images/code.png';
import contentLeft from './images/54-23_contentLeft.jpg';
import pic1 from './images/13.png';
import pic2 from './images/14.png';
import pic3 from './images/15.png';
import pic4 from './images/16.png';
import bg from './images/2.jpg';
export default class PCClientsPage extends Component {

    componentDidMount() {
        global.eventUpload.pvTj({
            ek: 'pc_home'
        });
    }

    renderHeader = () => {
        return (
            <div className={styles.pcPagesheader}>
                <header>
                    <a href='javascript:;'></a>
                    <span>百度信用卡中心</span>
                </header>
                <img  src={bg} alt=''/>
            </div>
        );
    };
    renderContent = () => {
        return (
            <div className={styles.pcPagesContent}>
                <div className={styles.clear + ' ' + styles.pagesContent}>
                    <div className={styles.leftBox}>
                        <img src={contentLeft} alt=''/>
                    </div>
                    <ul className={styles.mid}>
                        <li>
                            <i></i>
                            信用卡申请，多家银行可选择
                        </li>
                        <li>
                            <i className={styles.icon2}></i>
                            办卡进度一键查询
                        </li>
                        <li>
                            <i className={styles.icon3}></i>
                            为您推荐最合适您的那张卡
                        </li>
                    </ul>
                    <div className={styles.rightBox}>
                        <img src={erweima}/>
                        <div className={styles.buttonBox}>
                            扫码立即体验
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    renderApplyContent = () => {
        return (
            <div className={styles.pcPagesApplyContent}>
                <div className={styles.pagesApplyContent}>
                    <div className={styles.topTip}></div>
                    <h1>申卡流程</h1>
                    <div className={styles.numLine}>
                        <u>1</u><b></b>
                        <u>2</u><b></b>
                        <u>3</u><b></b>
                        <u>4</u>
                    </div>
                    <ul className={styles.clear}>
                        <li>
                            <p>扫码进入首页</p>
                            <img src={pic1} alt=''/>
                        </li>
                        <li>
                            <p>选卡点击申请</p>
                            <img src={pic2} alt=''/>
                        </li>
                        <li>
                            <p>银行官网填写信息</p>
                            <img src={pic3} alt=''/>
                        </li>
                        <li className={styles.last}>
                            <p>提交申请等待审核</p>
                            <img src={pic4} alt=''/>
                        </li>
                    </ul>

                </div>
            </div>
        );
    };
    renderFooter = () => {
        return (
            <div className={styles.pcPagesFooter}>
                <div className={styles.pcPagesFooterContent + ' ' + styles.clear}>
                    <div>
                        <a className={styles.logo}></a>
                        <span className={styles.bot}>百度信用卡中心版权所有</span>
                    </div>
                    <p>联系我们xinyongka@baidu.com</p>
                </div>
            </div>
        );
    };

    render() {
        return (
            <div className={styles.pcPagesContainer}>
                {this.renderHeader()}
                {this.renderContent()}
                {this.renderApplyContent()}
                {this.renderFooter()}
            </div>
        );
    }
}
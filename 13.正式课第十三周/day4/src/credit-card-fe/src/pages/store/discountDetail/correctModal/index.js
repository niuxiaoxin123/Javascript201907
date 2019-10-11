/**
 * @file 纠错组件 js
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2018/12/26
 */
import React, {Component} from 'react';
import styles from './index.scss';
import hyphenate from '../../../../common/js/hyphenate';
import eventUpload from '../../../../common/js/eventUpload';

export default class CorrectModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            correctModalShow: false, // 纠错弹窗是否显示
            correctModalInfo: {}, // 纠错列表信息
            correctForm: {
                correctionCode: [], // 选中的纠错code列表
                diyMsg: '' // 自定义输入信息
            }
        };
    }

    render() {
        let {
            correctInfo,
            hideCorrectModal,
            maxOptionBtns
        } = this.props;
        let correctForm = this.state.correctForm;
        return (
            <div className={styles.correctModal}
                 onClick={hideCorrectModal}
                 id='modal'
                 onTouchMove={e => e.preventDefault()}>
                <div className={styles.layer} onClick={e => {
                    e.stopPropagation(); // 阻止冒泡
                }}>
                    <h5>{correctInfo.title}<i className={styles.close} onClick={hideCorrectModal}>&times;</i></h5>
                    <ul className={styles.correctButtons + ' clearfix'}>
                        {correctInfo.correctionList
                        && correctInfo.correctionList.slice(0, maxOptionBtns || 100).map((correctItem, correctIndex) =>
                            <li onClick={this.correctBtnClick.bind(this, correctItem)}
                                key={correctIndex}
                                className={correctForm.correctionCode.indexOf(correctItem.correctionCode) === -1
                                    ? '' : styles.active}>
                                {correctItem.correctionMsg}
                            </li>)}
                    </ul>
                    <div className={styles.diyMsg}>
                        <textarea placeholder='其他错误请在此填写，如需投诉请留下联系方式'
                                  onChange={this.textareaChangeHandle}
                                  maxLength='100'
                                  ref='textarea'
                                  onClick={this.focuss}
                                  onFocus={this.focus}
                                  onBlur={this.blur}>
                        </textarea>
                        <i className={styles.textLengthTip}>{correctForm.diyMsg.length}/100</i>
                    </div>
                    <div className={styles.correctSubmit}
                         onClick={this.correctSubmitHandle}>提交并怒斥
                    </div>
                </div>
            </div>
        );
    }

    focus = () => {
        setTimeout(function () {
            // 设置body的高度为可视高度+302
            // 302为原生键盘的高度
            document.getElementsByTagName('body')[0].style.height = (window.innerHeight + 302) + 'px';
            document.body.scrollTop = 302;
        }, 300);
    };
    blur = () => {
        document.getElementsByTagName('body')[0].style.height = window.innerHeight + 'px';
    };
    focuss = () => {
        this.refs.textarea.focus();
        setTimeout(() => {
            document.body.scrollTop = document.body.scrollHeight;
        }, 100);
    };
    // 上报纠错
    correctSubmitHandle = () => {
        let {
            successToast,
            hideCorrectModal,
            warnToast,
            correctInfo,
            cfgCode
        } = this.props;
        let correctForm = this.state.correctForm;
        if (correctForm.correctionCode.length !== 0 || correctForm.diyMsg !== '') {
            eventUpload.pvTj({
                es: 'credit',
                ek: 'correct_youhui',
                ...correctForm,
                offerCode: correctInfo.offerCode,
                storeCode: hyphenate.getSearchString().storeCode,
                cfgCode
            });
            successToast();
            hideCorrectModal();
        }
        else {
            warnToast();
        }
        this.props.trackEventUpload('correctsubmit');
    };

    // 纠错选项点击
    correctBtnClick = correctBtnInfo => {
        let {
            correctForm
        } = this.state;
        let correctionCode = correctBtnInfo.correctionCode;
        let codeIndex = correctForm.correctionCode.indexOf(correctionCode);
        // console.log(56, correctBtnInfo, correctionCode, correctForm, codeIndex);
        if (codeIndex === -1) { // 不存在就添加
            correctForm.correctionCode.push(correctionCode);
        }
        else { // 存在就删除
            correctForm.correctionCode.splice(codeIndex, 1);
        }
        this.setState({
            correctForm
        }, () => {
            console.log(69, this.state.correctForm);
        });
    }

    // 文本域输入
    textareaChangeHandle = e => {
        let correctForm = this.state.correctForm;
        correctForm.diyMsg = e.target.value.substring(0, 100);
        this.setState({
            correctForm
        });
    }
};
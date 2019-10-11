/**
 * @file 程序主入口 js
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */

import React, {Component} from 'react';
import styles from './index.scss';
import Header from '../components/header';
import hyphenate from '../../common/js/hyphenate';

import baiduLogo from './imgs/baidu-logo.png';
const title = '用户协议';

export default class ContractDetail extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        hyphenate.setDocumentTitle(title);
    }

    render() {
        return (
            <div className={styles.contract + ' clearfix'}>
                {!window.isInWallet
                    && <div className={styles.contractHeader}>
                        <Header title={title} />
                    </div>}
                <div className={styles.contractDetail}>
                    {!window.isInWallet && <div className={styles.contractHole}></div>}
                    <h2>百度信用卡中心用户须知</h2>
                    <ul>
                        <li>
                            <span>1、</span>
                            <p>
                                百度信用卡中心由北京百度网讯科技有限公司运营，是向个人提供信用卡在线申领等相关服务的金融平台。
                            </p>
                        </li>
                        <li>
                            <span>2、</span>
                            <p>
                                百度信用卡中心用户为通过百度信用卡中心平台向特定合作银行提出信用卡申领的申请人。
                            </p>
                        </li>
                        <li>
                            <span>3、</span>
                            <p>
                                作为百度信用卡中心用户，您同意遵守与申领银行信用卡相关的银行重要提示、申领声明、业务章程、领用合约、收费表、勾选信用卡业务功能及增值服务的业务条款细则等法律文件。
                            </p>
                        </li>
                        <li>
                            <span>4、</span>
                            <p>
                                您应当符合合作银行信用卡用户的基本条件，完整填写信用卡申请资料及信用卡申请表，并保证所填信息的真实性及准确性。
                            </p>
                        </li>
                        <li>
                            <span>5、</span>
                            <p>
                                您仅可为本人提交信用卡申领申请，切勿将个人信息提供给中介机构办理信用卡以防上当受骗。
                            </p>
                        </li>
                        <li>
                            <span>6、</span>
                            <p>
                                百度信用卡中心在提供信用卡申请服务时，将严格按照合作银行对信用卡申请的各项规范提请您进行信用卡申请（包括但不限于填写信用卡申请资料及信用卡申请表等）。若合作银行要求其他申请步骤，如本人办理银行柜面确认等，请您严格遵守。信用卡申请是否获批、信用卡获批额度、办卡进度等事宜，由合作银行确定，百度信用卡中心仅尽通知义务。与信用卡申请相关的具体建议、投诉、纠纷等，请您自行与合作银行解决。
                            </p>
                        </li>
                        <li>
                            <span>7、</span>
                            <p>
                                依据合作银行的不同要求，用户申领信用卡时填写申请资料的页面可能会跳转至银行页面；亦可能继续在百度信用卡中心页面填写申请资料，若继续在百度信用卡中心页面，请确保知晓以下三款声明：
                                <br />
                                (1)为使您获得更轻松的访问体验，提升服务质量，百度信用卡中心将在法律、法规、以及合作银行允许的范围内，及在您确认的情况下，记录您本次填写的部分个人身份信息，以免除二次申领他行信用卡或该行其他种类信用卡时（如有）重复输入申请信息的步骤，您可对被记录的信息进行确认或更改，并完善其他申请信息，上述信息将提交给您选择的合作银行用于信用卡申请。
                                <br />
                                (2)百度信用卡中心对您的信息承担保密义务，不会将您留存的个人身份信息用于任何未经您同意的用途，法律法规的规定或有权机关要求除外。
                                <br />
                                (3)您留存的上述申请信息，百度信用卡中心会按现有技术提供相应的安全措施来保护您的信息，提供合理的安全保障，并将在任何时候尽力做到使您的信息不被泄漏、毁损或丢失。
                            </p>
                        </li>
                        <li>
                            <span>8、</span>
                            <p>
                                一旦您使用本产品，即视为您已确认本用户须知，已充分阅读、理解并接受上述条款。
                            </p>
                        </li>
                        <li>
                            <span>9、</span>
                            <p>
                                百度信用卡中心有权对本用户须知进行变更，不再另行单独通知，该等变更将在公布时即时生效。若您在本规则变更后仍通过信用卡中心向特定合作银行提出信用卡申领服务的，则视为接受修改后的用户须知并受之约束。
                            </p>
                        </li>
                    </ul>
                    <div className={styles.contractFooter + ' flex'}>
                        <img src={baiduLogo} alt='百度logo' />
                    </div>
                </div>
            </div>
        );
    }
}

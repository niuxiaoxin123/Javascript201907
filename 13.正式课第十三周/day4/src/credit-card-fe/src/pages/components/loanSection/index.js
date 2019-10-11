/**
 * @file 贷款广告
 * @author xiangjian(xiangjian@baidu.com)
 * @date 2019/03/28
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as commonActions from '../../../actions';
import styles from './index.scss';
import LoanItem from './loanItem';
import RecommendTitle from '../recommendTitle';

class LoanSection extends React.Component {
    render() {
        let {loanList, pageName, title, trackIdCode = 'loanItem'} = this.props;
        if (!(loanList && loanList.length > 0)) {
            return null;
        }
        return (
            <div className={styles.loanContainer}>
                <div className={styles.divider}/>
                <RecommendTitle title={title || '高人气贷款'} />
                {loanList && loanList.length > 0 && loanList.map(item =>
                    <LoanItem loanItem={item}
                        trackIdCode={trackIdCode}
                        pageName={pageName}
                        key={item.productId}
                        commonActions={this.props.commonActions}></LoanItem>
                )}
            </div>
        );
    }

}

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
    commonActions: bindActionCreators(commonActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoanSection);
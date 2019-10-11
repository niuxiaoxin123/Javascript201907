/**
 * @file pv统计入口 js  改为在app.js中routerUpdate中 -- 方法已废弃，但这种写法可以先保留作为后续参考
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/7/4
 */
import React, {Component} from 'react';
import EventUplod from './eventUpload';

export default PageComponent => {
    let didUpdate = PageComponent.WrappedComponent.prototype.componentDidUpdate;

    class TjWrappedComponent extends Component {

        componentDidMount() {
            let flag = 0;
            // 劫持子组件的 didupdate 生命周期，在这个生命周期发送一个埋点请求
            PageComponent.WrappedComponent.prototype.componentDidUpdate = function (args) {
                if (!flag) {
                    EventUplod.pvTj();
                    flag = 1;
                }
                didUpdate && didUpdate.apply(this, args);
            };
        }

        render() {
            return <PageComponent/>;
        }
    }

    return TjWrappedComponent;
};

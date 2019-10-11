import React from "react";
import Title from "./Title";
import PropTypes from "prop-types";
export default class Header extends React.Component{
    constructor(){
        super();
    }
    // 定义
    static contextTypes={
        setColor:PropTypes.func
    }
    render(){
        return <div>
            {/*APP中的方法以上下文的方式传递到该组件*/}
            <button onClick={this.context.setColor}>改颜色</button>
            <Title/>
        </div>
    }
}
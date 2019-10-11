import React from "react";
import Header from "./Header";
import PropTypes from "prop-types";
// 父 ： childContextTypes  getChildContext
// 子 : contextTypes ； 上下文类型
// 跨组件数据交互；爷爷可以可以直接将数据传递给孙子；孙子需要接受一下；
export default class App extends React.Component{
    constructor(){
        super();
        this.state={color:"red",a:100};
    }
    static childContextTypes={
        // 定义上下文数据的类型
        color:PropTypes.string,
        setColor:PropTypes.func,
        a:PropTypes.number
    }
    getChildContext(){
        // 这是在定义上下文数据
        return {color:this.state.color,setColor:this.setColor,a:this.state.a}
    }
    setColor=()=>{
        this.setState({color:"yellow"})
    }
    render(){
        return <div>
                <Header/>
        </div>
    }
}

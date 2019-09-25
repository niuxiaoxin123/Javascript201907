import React from "react";
import ReactDOM from "react-dom";
class Panel extends React.Component{
    constructor(){
        super();
        this.state={a:1,b:2}
    //    如果input中的value值是从当前组件的状态获取的；那么该组件就是一个受状态控制的组件；要想更改input的value的值，需要给input框绑定一个onchange事件
        // 如果没有绑定onchange,那么只会渲染成一个只读的input;
    }
    change=(key,e)=>{
        // 多属性的映射
        this.setState({[key]:e.target.value})
    }
    render(){
        return <div>
            <input type="text" value={this.state.a} onChange={(e)=>{this.change("a",e)}}/>
            <input type="text" value={this.state.b} onChange={(e)=>{this.change("b",e)}}/>
            {this.state.a}
        </div>
    }
}
ReactDOM.render(<Panel/>, document.querySelector("#root"));


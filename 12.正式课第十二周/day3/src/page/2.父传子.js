import React from "react";
import ReactDOM from "react-dom";

// 父传子： 将父组件中的数据或状态以属性的方式传递给子组件，那么子组件就可以通过props获取到
class Panel extends React.Component{
    constructor(){
        super();
        this.state={user:"张三",pass:1223}// 状态都是私有的
    }
    render(){
        return <div>
            <Header name={this.state}/>
            <p>国庆节上课</p>
        </div>
    }
}
// {} : 如果放在行间属性是可以放对象或者是函数；
// 但是放在元素里面就不能放对象或者函数的空间地址；
class Header extends  React.Component{
    constructor(){
        super();
    }
    render(){
        return <h1>{this.props.name.user}是标题</h1>
    }
}
ReactDOM.render(<Panel/>, document.querySelector("#root"));


import React from "react";
import ReactDOM from "react-dom";
// 父传子： 将父组件中的数据或状态以属性的方式传递给子组件，那么子组件就可以通过props获取到
class Panel extends React.Component{
    constructor(){
        super();
        this.state={user:"张三",pass:1223}// 状态都是私有的
    }
    changeUser=()=>{
        // 父组件中的数据只有自己可以更改；需要父组件更改自己状态的方法通过属性传递给子组件，子组件来调用；
        this.setState({user:"李四"});
    }
    render(){
        return <div>
            <Header name={this.state.user} changeLi={this.changeUser}/>
            <p>国庆节上课</p>
        </div>
    }
}
class Header extends  React.Component{
    constructor(){
        super();
    }
    change=()=>{
        // props传递来的属性是只读，不能修改；
        // this.props.name="李四";
        this.props.changeLi();
    }
    render(){
        return <div>
            <h1>{this.props.name}是标题</h1>
            <button onClick={this.change}>改名字</button>
        </div>
    }
}
ReactDOM.render(<Panel/>, document.querySelector("#root"));

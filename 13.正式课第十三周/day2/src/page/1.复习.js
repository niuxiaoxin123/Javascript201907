import React from "react";
import ReactDOM from "react-dom";
// JSX语法；JS和HTML的混合写法
// JSX 语法
let obj = {name:"珠峰"}
let d = <div>{1>3?1:0}</div>
// React.createElement
// ReactDOM.render

//定义组件，一般用于静态的组件
function Fn(props) {
    return <div>
        {props.name}
    </div>
}
class Login extends React.Component{
    constructor(){
        super();
        this.state={num:1}
    }
    componentDidMount(){

    }
    shouldComponentUpdate(nextProps,nextState){

    }
    add=()=>{
        //console.log(this);
        this.setState({num:this.state.num+1});
        //this.setState((prevState)=>({num:prevState.num+1}))
        // 定时器中
        this.props.a=5;
    }
    render(){
        return <div>
            <div onClick={this.add}></div>
            {this.props.a}
            </div>
    }
}
// defaultProps-->constructor-> componentWillMount--> render--> componentDidMount
// shouldComponentUpdate--> componentWillUpdate->render--> componentDidUpdate

// shouldComponentUpdate-> componentWillUpdate-> render-> componentWillReceiveProps->shouldComponentUpdate(子)-> componentWillUpdate（子）-> render（子）-> componentDidUpdate(子）-》componentDidUpdate
ReactDOM.render(<div><Fn name="a"/><Login a="1"/></div>,document.getElementById("root"))

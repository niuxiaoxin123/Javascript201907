import React from "react";
import ReactDOM from "react-dom";
/*let a = {name:"123"}
let h = <div>
    <div>{a.name}</div>
    <div hg={fn}>{}</div>
</div>
// React.createElement(type,data,"");
console.log(React);*/

// 组件
//
let u = {a:"快乐",b:"放假"}
/*
function Foo(props) {
    return <div>{props.yy}{props.a}{props.h.a}</div>
}
*/

// class
// 有属性有状态，当属性或状态发生改变，会引起视图的更新；
class Count extends React.Component{
    constructor(){
        super();
        //this.state={num:0}
    }
    /*add(){
        console.log(this);
    }*/
    add=()=>{
        //this.state.num=1000;// 可以更改数据，但是不能引起视图的更新；
        console.log(this);
        //this.setState({})
    }
    render(){
        //this--> 当前实例；
        return <div>{this.props.yy}
           {/* <button onClick={this.add}>1</button>
            <button onClick={()=>{this.add()}}>国庆节快乐</button>*/}
            <button onClick={this.add}>3</button>
            <button onClick={this.add.bind(this)}>4</button>
        </div>
    }
}
// react生命周期  defaultProps --> constructor --> componentWillMount ---> render -->componentDidMount

// 当属性或状态更新，会引发的钩子函数
// shouldComponentUpdate (参数：nextProps,nextState)(返回值：true/false)--> componentWillUpdate--render---> componentDidUpdate


// 子组件： componentWillReceiveProps
// componentWillUnMount : 下载组件；

// 轮播图：
ReactDOM.render(<Count yy="国庆" {...u}  h={u}/>,document.querySelector("#root"));
// JSX元素；是html和JS的混合写法；

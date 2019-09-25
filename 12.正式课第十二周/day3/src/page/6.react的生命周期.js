import React from "react";
import ReactDOM from "react-dom";
class Parent extends React.Component{
    /*static defaultProps={
        name:"JSON"
    }*/
    constructor(props){
        super(props);
        // 一般会在这里初始化状态;可以在constructor中获取设置的默认属性；
        console.log("constructor")
        this.state={num:0,n:10};
        console.log(this.props.name);
    }
    componentWillMount(){
        // 在组件将要挂载之前，可以直接修改状态，当render运行时，会获取到组件的最新的状态；不需要再次render；
        console.log("componentWillMount");

    }
    componentDidMount(){
        // 组件已经挂载完成；生成一个react组件，一定会经历这四个钩子函数；
        // 当更新完组件之后，该钩子函数不再执行，只有当第一次渲染组件时，才会执行该钩子函数；
        // 可以在这里面获取元素；
        console.log("componentDidMount")
    }
    change=()=>{
        // 调用一次setState,就会执行一次render方法；
        // this.setState({num:this.state.num+1})
        // 卸载某个元素内的组件；
        ReactDOM.unmountComponentAtNode(document.querySelector("#root"))
    }
    shouldComponentUpdate(nextProps,nextState){
        // 经常用于react的性能优化
        console.log("shouldComponentUpdate")
       /* console.log(nextProps);
        console.log(nextState);
        if(nextState.num%2===0){
            return true;
        }else{
            return false;
        }*/
        // 第一个参数是下一次的属性；第二个参数是下一次的状态
        // 如果当前函数返回false，那么不再继续调用render函数；如果返回true，需要继续执行render，重新刷新视图
        return true;
    }
    componentWillUpdate(){
        // 当属性或状态发生改变，都会引发视图的更新；
        console.log("componentWillUpdate")
    }
    componentDidUpdate(){
        console.log("componentDidUpdate")
    }
    componentWillUnmount(){
        // 将要卸载组件
        console.log(document.getElementById("a"));
        console.log("componentWillUnmount");
    }
    render(){
        // 用来渲染视图；
        console.log("render")
        return <div>
            {/*父组件的状态作为属性传递给了子组件*/}
            <Child m={this.state.n}/>
            <button onClick={this.change} id="a">{this.state.num}{this.props.name}</button>
        </div>
    }
}
// 当父组件更新时，会先执行子组件的componentDidUpdate，最后执行父组件的componentDidUpdate；
class Child extends React.Component{
    constructor(){
        super();
    }
    componentWillReceiveProps(){
        // 当初始化这个组件时，该钩子函数是不运行的，当属性发生改变，才会执行
        console.log("componentWillReceiveProps")
    }
    shouldComponentUpdate(){
        console.log("child  shouldComponentUpdate")
        return true;
    }
    componentWillUpdate(){
        console.log("child  componentWillUpdate")
    }
    componentDidUpdate(){
        console.log("child  componentDidUpdate")
    }
    render(){
        return <div>
            <p>我是子组件</p>
            <p>{this.props.m}</p>
        </div>
    }
}
// react的生命周期： defaultProps-->constructor-->componentWillMount-->render-->componentDidMount
// 数据更新 ： shouldComponentUpdate--> componentWillUpdate--> render--> componentDidUpdate

// 如果有子组件： componentWillReceiveProps--> shouldComponentUpdate--> componentWillUpdate -->render---> componentDidUpdate(子组件)-->componentDidUpdate(父组件)
ReactDOM.render(<Parent/>, document.querySelector("#root"));
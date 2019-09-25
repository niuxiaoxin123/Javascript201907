// 1. 组件
import React,{Component} from "react";
import ReactDOM from "react-dom";
/*function Foo(){
    return <div onClick={fn}></div>
}*/
class Bar extends React.Component{
    constructor(props){
        super(props);
        // 一般在constructor中定义状态
        this.state={num:0}
    }
    componentDidMount(){
        // 在延迟的回调中，setState是同步的；
        // 在react生命周期或事件中，是异步的；
        /*setTimeout( ()=>{
            this.setState({num:1});
            console.log(this.state.num);
            this.setState({num:3});
        },1000)*/
    /*    this.state.num+=1;
        this.setState({num:this.state.num+=1})
        this.setState({num:this.state.num+=2})*/
        // 如果传递的是函数，那么不会被覆盖；当下一个状态要依赖上一个状态，需要使用函数；
        this.setState((prevState)=>({num:prevState.num+1}));
        //console.log(this.state.num);
        this.setState((prevState)=>{
            /*console.log(prevState)
            console.log(this.state);*/
            return {num:prevState.num+2}
        });
    }
    render(){
        console.log(this.state);
        return <div>{this.state.num}</div>
    }
}
// 1.class生命的组件有this  有状态  有生命周期
// 2. 在react中只有属性的变化和状态改变才会引发视图的更新；
ReactDOM.render(<Bar a="19"/>, document.querySelector("#root"));

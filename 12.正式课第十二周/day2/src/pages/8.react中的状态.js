import React from "react";
import ReactDOM from "react-dom";
// 在react中，属性和状态的更改都会引起视图的更新；
// 1.属性是外界传递进来的
// 2.状态是组件内部自己私有的；
class Count extends React.Component{
    constructor(){
        super();
        this.state={num:0,age:18}// 初始化当前组件的状态
    }
    add=()=>{
        //this.state.num+=1;
        //console.log(this.state.num);
        // 在react中想更新视图，调用render，就得更新状态，想更改状态，就得调用setState,setState可以让render再次执行；视图才能更新
        // setState:是一个更新状态的函数;参数就是最新的状态；
        // 如果出现多次setState,会进行合并，只会一次渲染；
        /*this.setState({num:this.state.num+=1});
        this.setState({num:this.state.num+=1});*/
        // 如果参数是一个函数，会把函数的返回值进行重新的render;
       /* this.setState((prevState)=>{
            console.log(prevState);// 上一次的状态；
            // 当前状态需要依赖上一次的状态时，需要用函数；
            return {num:1}
        })*/
       /*setTimeout(()=>{

       },1000);*/
       // 在React事件中和react的生命周期钩子函数中，setState是异步的；当执行完setState,并不能获取到更新后的state值；
        // 在延迟的回调中，setState就是同步的；
        /*this.setState({num:100});
        this.setState({num:this.state.num+=2});*/
        this.state.num+=1;
        //this.setState({num:this.state.num+=1});
        //console.log(this.state.num);
        this.setState({num:this.state.num+=1});
    }
    render(){
        //console.log(this.state)
        return <div>
            <p>{this.state.num}</p>
            {/*如果需要传参，可以在函数的外面包一层函数*/}
            <button onClick={this.add}>加</button>
            {/*<button onClick={()=>{this.add(1)}}>加1</button>*/}
            {/*bind默认返回一个函数*/}
            {/*<button onClick={this.add.bind(null,2)}>加2</button>*/}
        </div>
    }
}
let num =1
ReactDOM.render(<Count a={num}/>,document.querySelector("#root"))


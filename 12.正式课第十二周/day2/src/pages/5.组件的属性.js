import React from "react";
import ReactDOM from "react-dom";
class Bar extends React.Component{
    constructor(){
        super();
    }
    render(){
        // 需要return一个react元素；
        console.log(100);
        return <div>
            {this.props.date.toLocaleString()}
        </div>
    }
}
// 在react中，属性更新和状态改变都可以影响视图；
// 1. 把组件当做JSX元素使用；
let time = new Date();
setInterval(()=>{
    time = new Date();
    ReactDOM.render(<Bar date={time}/>, document.querySelector("#root"));
},1000);
    // 每隔一秒，ReactDOM.render 也会同时执行一次；date传递过去的值也会更新一次，才能让视图更新；

// react元素是组件的基本组成单位
// 1. 返回的一个唯一的react元素
// 2. 组件名字的首字母需要大写
// 3. 通过render渲染成真实的DOM；



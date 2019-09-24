import React from "react";
import ReactDOM from "react-dom";

// 1. 在react中定义组件两种方式
// 1) react组件的名字首字母需要大写，为了区分JSX元素
// 2)

// 1. 组件的特点： 1） 可组合  2） 可复用  3） 可维护
function Foo(props) {
    // 组件每当被调用一次，都会执行一次；
    // 组件当使用时，会把行间属性组合成一个对象，把这个对象传给当前函数的第一个参数；
    // prop:属性
    // 如果需要传递一个对象，需要对对象用...展开,放入行间属性；
    console.log(props);
    return <div>{props.name}</div>
}
let obj = {name:"中午饭"}
let w = <div>
    <p>国庆节阅兵</p>
    {/*<Foo a="1" b="5" obj={obj}>234</Foo>*/}
    <Foo a="1" b="5" {...obj}>234</Foo>
    <Foo a="1" b="5" name={obj.name}>234</Foo>
    {/*<Foo a="2"/>
    <Foo a="3"/>*/}
</div>;
ReactDOM.render(w,document.getElementById("root"));

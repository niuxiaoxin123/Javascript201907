import React from "react";
import ReactDOM from "react-dom";
import "./index.css"
// JSX : 是HTML和JS的一种混合写法；
//let a = <div className="a" yyStudent="123">12345</div>;
let  obj= {name:"张帅文"};
//let a = <h1>{1+2?0:9}</h1>;
// let b = <div>{[<div>1</div>,<div>2</div>,<div>3</div>]}</div>
function fn() {
    return 12345;
}
let c = <div style={{color:"red",fontSize:"12px"}} dayname={obj.name}>{fn()}</div>
// JSX不是html
// JSX 语法
// 1.JSX元素行间不能使用关键字；class ==>className  for==> htmlFor
// 2.行间属性名尽可能采用驼峰的命名方式；ReactDOM.render(c,document.getElementById("root"));
// 3.可以采用花括号去获取值；花括号支持三元运算符；
// 4.花括号是null/ undefined /true/ false 都不显示；
// 5.大括号中不能直接放对象，对象不能作为react的子元素；数组是可以的；数组中如果每一项都是JSX元素，最后会被一起渲染；
// 6.大括号可以放入函数的执行结果，但是不能直接把函数的空间地址放在这里；
// 7.在JSX元素中，style={{background:"red"}},样式中如果有-，需要换成驼峰；

ReactDOM.render(c,document.getElementById("root"));

import React from "react";
import ReactDOM from "react-dom";
//
//JSX
let a = <div name="zhongguo">
    我爱你中国
    <p>日本是中国的</p>
    <p>日本是中国的</p>
</div>;// 这是一个react元素，也叫JSX元素
console.log(a);// 对象；原因是当JS解析时，会把这样的标签通过React.createElement创建一个元素对象

// React.createElement;其实JSX元素是React.createElement的语法糖；
let  b = React.createElement(
    "div",
    {name:"zhongguo"},
    "我爱你中国",
    React.createElement("p",null,"日本是中国的"),
    React.createElement("p",null,"日本是中国的")
);
console.log(b);
ReactDOM.render(a,document.getElementById("root"));
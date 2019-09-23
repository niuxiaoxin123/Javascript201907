import React from "react";
import ReactDOM from "react-dom";

let a = <div id="you">
            你很好
        </div>
let b = <div>
            大家好
        </div>;

// ReactDOM.render:
// 1. 第一个参数是react元素；只能有一个根元素；
ReactDOM.render(a,document.getElementById("root"),function () {
    console.log(document.getElementById("you"));
    console.log("挂载成功")
});
console.log(100);
//ReactDOM.render(b,document.getElementById("root"));

// React : react的核心库；
//1.ReactDOM 是react-dom模块中导出一个对象，里面有一个render方法：render方法就是将react元素或react组件转成真实的DOM元素，并且插入到页面中
//2.当执行render时，会把root根元素中所有的元素进行替换；
//3.获取DOM需要等到react元素挂载到真实的页面上之后才能获取到；
//4.render有第三个参数，是一个回调函数，当真实DOM挂载完毕才会执行该回调；
//5.ReactDOM.render 是同步渲染DOM，当真正挂载完毕以后，才继续向下执行；
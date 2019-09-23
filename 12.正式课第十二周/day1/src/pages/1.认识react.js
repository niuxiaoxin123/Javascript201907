import React from "react";
import ReactDOM from "react-dom";
// React 是react的核心库；在每个js中都要引入该react；
let a = <div>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
            <h1>不准睡觉</h1>
        </div>;

// 在react中，用标签定义的变量都存储了虚拟的DOM的对象；存在于当前作用域；
// 在react中，在js中写的标签就是react元素；
// 这种写法就是jsx语法: 允许在jS中写标签，但是当真正编译的时候按照一个对象来进行解析；
console.log(a);
ReactDOM.render(a,document.getElementById("root"));
// ReactDOM.render :
// 1. 将虚拟的DOM转成真实的DOM
// 2. 再把真实的DOM插入到root对应的根元素中；
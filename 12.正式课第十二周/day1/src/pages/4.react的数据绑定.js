import React from "react";
import ReactDOM from "react-dom";
let arr = [{name:"马冲冲",age:20},{name:"许正",age:22}];
// 在react中渲染数组需要将数据的数组映射成一个标签的数组；每一个映射的标签需要加上key属性；key代表唯一性；
let show = <ul>
       {/*{[<div key="1">1</div>,<div key="2">2</div>]}*/}
    {[<div></div>,<div></div>]}
            {arr.map((item,index)=>{
                return <li key={index}>{item.name}{item.age}</li>
            })}
            </ul>
ReactDOM.render(show,document.getElementById("root"));
//{/*{[<div key="1">1</div>,<div key="2">2</div>]}*/}

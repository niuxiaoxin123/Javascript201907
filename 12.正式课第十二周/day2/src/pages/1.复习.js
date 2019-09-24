import React from "react";
import ReactDOM from "react-dom";
let obj = {name:1}
let f = <div>{1+2>1?100:200}</div>;// 在JS中写元素标签，JS和HTML混合的写法；
let y = <div>{[1,2,3,4]}</div>
// 数组的每一项都是一个react元素，那么花括号会给自动渲染成对应标签元素；
let z = <div>{[<p>1</p>,<p>2</p>,<p>3</p>]}</div>

// react 数据绑定
let ary = [1,2,3,4,5]
/*let u = <ul>{[<li>1</li>,<li>2</li>,<li>3</li>,<li>4</li>,<li>5</li>]}</ul>;*/
// 在react进行数据绑定时，用map;
let t = <ul>
    {ary.map((item,index)=>{return <li key={index}>{item}</li>})}
</ul>
// React.createElement


class Element{
    constructor(type,attr,children){
        this.type=type;
        this.props={...attr,children}
    }
    render(){
        // 原型上的render方法;
        let ele = document.createElement(this.type);
        for(let key in this.props){
            if(key!=="children"){
                // class==> className  for:
                // label的for--> htmlFor
                let _key = key;
                if(key==="className"){
                    key="class"
                }
                if(key==="htmlFor"){
                    key="for"
                }
                ele.setAttribute(key,this.props[_key]);
            }else{
                for(let i =0;i<this.props.children.length;i++){
                    let cur = this.props.children[i];
                    let a = cur instanceof Element?cur.render():document.createTextNode(cur);
                    ele.appendChild(a);
                }
            }
        }
        return ele;
    }
}
let obj = {
    createElement(type,attr,...children){// 剩余运算符
        return new Element(type,attr,children)
    }
}
let objDOM={
    // render的第一个实参是createElement的返回值
    render(ele,container){
        container.appendChild(ele.render())
    }
}
obj.createElement("div",{className:"user"},"我的用户名")
let a = <div></div>;
React.createElement("div")
ReactDOM.render(u,document.getElementById("root"));


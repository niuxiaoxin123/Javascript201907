import React from "react";
import ReactDOM from "react-dom";

class Time extends React.Component{
    constructor(){
        super();
    }
    add(){
        //事件一般放到当前组件实例的原型上
        console.log(100);
        console.log(this.props);
        // 如果该函数是箭头函数，this指向当前组件的实例；
    }
    change=(e)=>{
        console.log(e);//事件对象；target指向当前的元素
    }
    render(){
        // on+事件行为；事件的首字母大写；
        return <div>
            <button onClick={this.add}>按钮</button>
            {/*JSX的花括号里面必须有内容，但是不能是对象*/}
            <input type="text" onChange={this.change}/>
        </div>
    }
}
ReactDOM.render(<Time  a="1"/>, document.querySelector("#root"));

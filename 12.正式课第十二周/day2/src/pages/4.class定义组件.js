import React from "react";
import ReactDOM from "react-dom";
// 类声明组件
// 在react中，当组件的属性或者是状态发生改变，才会引发组件的更新；
class Foo extends React.Component{
    constructor(props){
        // 可以通过props的这个参数获取到行间属性；但是并没有将props放到实例上，需要在super把数据传递过去，这样在constructor中的实例上就可以获取行间传递的属性了；
        super();
        //console.log(props);
        // 当执行constructor,实例上的props默认是undefined；后期会往当前实例的props属性添加行间属性
        console.log(this.props);
        //console.log(101);
        // constructor和render都是react组件中生命周期钩子函数中的一个；先执行constructor，后执行render；
}
render(){
    console.log(this.props);
    //console.log(0);
    // console.log(this);
    // 类声明的组件，通过行间属性传递时，把属性打包成一个对象放到当组件实例上的props属性上；
    // 这个render调用一次执行一次；
    return <div>{this.props.user}</div>;
}
}
let obj={user:"灯泡",age:3};

/*let a = {};
console.log(a);
a.name=1;*/

ReactDOM.render(<Foo {...obj}/>,document.querySelector("#root"));

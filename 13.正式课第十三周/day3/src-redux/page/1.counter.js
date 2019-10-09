import React from "react";
import store from "../store/index";
import action from "../store/action/counter";
import {connect} from "react-redux"
//在react-redux中，有Provider还有connect函数；
// 将redux中数据和action中的动作以属性的方式传递给当前组件
class Counter extends React.Component{
    /*constructor(){
 super()
 this.state={num:store.getState().counter.num}
 }*/
    /* componentDidMount(){
     store.subscribe(()=>{
     this.setState({num:store.getState().counter.num})
     })
     }*/
    add=()=>{
        //store.dispatch(action.add())
        // 1. action-type: 动作类型
        // 2. action中文件counter
        // 3. 完善当前组件的事件行为
        // 4. reducer
        this.props.add(1)
    }
    min=()=>{
        //store.dispatch(action.min())
        this.props.min();
    }
    render(){
        return <div>
            <button onClick={this.add}>+</button>
            {this.props.num}
            <button onClick={this.min}>-</button>
        </div>
    }
}
// 需要导出一个连接后的组件
// 遍历state到当前组件的属性上
/*let mapStateToProps=(state)=>({...state.counter});//// 默认把store中的state传给当前函数形参

let mapDisPatchToProps=(dispatch)=>{
    // dispatch :<===> store.dispatch
    // 把该函数的返回值以属性方式放到当前组件上；
    return {
        add:(n)=>{dispatch(action.add(n))},
        min:()=>{dispatch(action.min())}
    }
}*/
//export default connect(mapStateToProps,mapDisPatchToProps)(Counter)
export default connect(state=>({...state.counter}),action)(Counter);
// 如果connect第二个参数是一个对象，action；会默认调用一个方法；bindActionCreators

let bindActionCreators=(action,dispatch)=>{
    //action 就是connect第二个实参，dispatch ===store.dispatch
    // 目的是得到一个组装后的对象
    let  obj = {};
    for(let key in action){
        obj[key]=(...arg)=>{
            dispatch(action[key](...arg));
        }
    }
    return obj;
    // {add:(n)=>{dispatch(action.add(n))},
    //    min:()=>{dispatch(action.min())}
    //}
};

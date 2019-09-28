import React from "react";
import store  from "../store/index";
import actions from "../store/actions/counter";
// 1.定义常量
// 2.派发一个动作
// 3.写reducer;

export default class Count extends React.Component{
    constructor(){
        super();
        console.log(store.getState());
        this.state={num:store.getState().counter.num}
    }
    componentDidMount(){
        store.subscribe(()=>{
            this.setState({num:store.getState().counter.num});
        });
    }
    add=()=>{
        // 仅仅是让store中的数据发生改变，但是不会触发render，所以视图不会更新的，所以需要调用setState方法，刷新视图；
        store.dispatch(actions.add(2));
    }
    min=()=>{
        store.dispatch(actions.min(1));
    }
    render(){
        return <div>
            <button onClick={this.add}>+</button>
            {this.state.num}
            <button onClick={this.min}>-</button>
        </div>
    }
}


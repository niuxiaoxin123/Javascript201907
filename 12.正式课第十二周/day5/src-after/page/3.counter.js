import React from "react";
import ReactDOM from "react-dom";
import createStore from "./1.封装redux";

// 1.定义常量
// 2.派发一个动作
// 3.写reducer;

const ADD_COUNT="ADD_COUNT";
const MIN_COUNT="MIN_COUNT";
let initState = {num:0};
function reducer(state=initState,action) {
    switch (action.type){
        case ADD_COUNT:
            return {...state,num:state.num+action.n};
        case MIN_COUNT:
            return {...state,num:state.num-action.n}
    }
    return state;
}
// 生成一个仓库；
let store = createStore(reducer);
class Count extends React.Component{
    constructor(){
        super();
        this.state={num:store.getState().num}
    }
    componentDidMount(){
        store.subscribe(()=>{
            this.setState({num:store.getState().num});
        });
    }
    add=()=>{
        // 仅仅是让store中的数据发生改变，但是不会触发render，所以视图不会更新的，所以需要调用setState方法，刷新视图；
        store.dispatch({type:ADD_COUNT,n:2});
    }
    min=()=>{
        store.dispatch({type:MIN_COUNT,n:1});
    }
    render(){
        return <div>
                <button onClick={this.add}>+</button>
                {this.state.num}
                <button onClick={this.min}>-</button>
            </div>
    }
}
ReactDOM.render(<Count/>,document.querySelector("#root"));

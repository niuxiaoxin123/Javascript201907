import React from "react";
import store from "../store/index";
import actions from "../store/action/counter"
export default class Counter extends React.Component{
    constructor(){
        super()
        this.state={num:store.getState().counter.num}
    }
    componentDidMount(){
        store.subscribe(()=>{
            this.setState({num:store.getState().counter.num})
        })
    }
    add=()=>{
        store.dispatch(actions.add(2));
        this.props.add(2)
    }
    min=()=>{
        store.dispatch(actions.min())
    }
    render(){
        return <div>
            <button onClick={this.add}>+</button>
            {this.state.num}
            <button onClick={this.min}>-</button>
        </div>
    }
}

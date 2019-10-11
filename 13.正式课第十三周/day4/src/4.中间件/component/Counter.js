import React from "react";
import actions from "../store/action/counter";
import {connect} from "react-redux";
 class Counter extends React.Component{
    constructor(){
        super()
    }
    add=()=>{
        this.props.add(2)

    }
    min=()=>{
        this.props.min(3)
    }
    render(){
        return <div>
            <button onClick={this.add}>+</button>
            {this.props.num}
            <button onClick={this.min}>-</button>
        </div>
    }
}
export default connect(state=>({...state.counter}),actions)(Counter);

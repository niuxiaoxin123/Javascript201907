import React from "react";
import store from "../store/index";
import actions from "../store/action/counter"
export default class Todo extends React.Component{
    constructor(){
        super()
        this.state={
            todo:store.getState().todo.todo,
            n:store.getState().counter.num
        }
    }
    render(){
        return <div>
            <input type="text"/>
            {this.state.n}
            <ul>{this.state.todo.map((item,index)=>{
                return <li key={index}>{item}</li>
            })}</ul>
        </div>
    }
}

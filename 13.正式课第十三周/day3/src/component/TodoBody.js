import React from "react";
import {connect} from "react-redux";
import action from "../store/action/index"
class TodoBody extends React.Component{
    constructor(){
        super();
    }
    del=(id)=>{
        this.props.delTodo(id);
    }
    chanVal=(id)=>{
        this.props.change(id)
    }
    fliterTodo=()=>{
        if(this.props.type==="finish"){
            return this.props.todos.filter(item=>item.isSelected);
        }else if(this.props.type==="unfinish"){
            return this.props.todos.filter(item=>!item.isSelected);
        }
        return this.props.todos;
    }
    render(){
        return <div>
            <ul className="list-group">
                {this.fliterTodo().map((item,index)=>{
                    return <li className="list-group-item" key={index}>
                        <input type="checkBox" checked={item.isSelected} onChange={()=>{this.chanVal(item.id)}}/>
                            {item.val}
                        <button className="btn-danger btn pull-right btn-xs" onClick={()=>{this.del(item.id)}}>X</button>
                    </li>
                })}
            </ul>
        </div>
    }
}
export default connect(state=>({...state.todo}),action)(TodoBody);
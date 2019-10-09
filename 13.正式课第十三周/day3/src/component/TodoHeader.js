import React from "react";
import {connect} from "react-redux";
import action from "../store/action/index";
class TodoHeader extends React.Component{
    constructor(){
        super();
    }
    add=(e)=>{
        if(e.keyCode===13){
            // state和action会放在当前组件的props上；
            this.props.addTodo(e.target.value);
            e.target.value="";
        }
    }
    render(){
        return <div>
            <h2>您还有{this.props.todos.filter(item=>!item.isSelected).length}件事未完成</h2>
            <input type="text" className="form-control" onKeyUp={this.add}/>
        </div>
    }
}
export default connect(state=>({...state.todo}),action)(TodoHeader);
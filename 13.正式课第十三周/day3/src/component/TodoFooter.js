import React from "react";
import {connect} from "react-redux";
import action from "../store/action/index";
class TodoFooter extends React.Component{
    constructor(){
        super();
    }
    changeType=(e)=>{
        this.props.changeT(e.target.dataset.type)
    }
    render(){
        console.log(111);
        return <div>
            <ul className="nav nav-pills" onClick={this.changeType}>
                <li role="presentation" className={this.props.type==="all"?"active":""}><a href="#" data-type="all">全部任务</a></li>
                <li role="presentation"  className={this.props.type==="finish"?"active":""}><a href="#" data-type="finish">已完成</a></li>
                <li role="presentation" className={this.props.type==="unfinish"?"active":""}><a href="#" data-type="unfinish">未完成</a></li>
            </ul>
        </div>
    }
}
export default connect(state=>({...state.todo}),action)(TodoFooter);
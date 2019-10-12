import React from "react";
export default class Adduser extends React.Component{
    constructor(){
        super();
    }
    add=()=>{
         let user = JSON.parse(localStorage.getItem("users"))||[];
         user.push({id:Date.now(),name:this.refs.x.value});
         localStorage.setItem("users",JSON.stringify(user));
         // 凡是被路由渲染的组件，当前组件会默认有三个键值对；history  location  match
        //
        this.props.history.push("/user/list");
        //console.log(this.props);
    }
    render(){
        return <div>
            <input type="text" className="form-control" ref="x"/>
            <button className="btn btn-danger" onClick={this.add}>新增用户</button>
        </div>
    }
}

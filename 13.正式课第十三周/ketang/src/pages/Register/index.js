import React from "react";
import {Link} from  "react-router-dom";
import "./index.less";
import img from "../../images/profile.png";
import {goRegister} from "../../api/login";
export default class Login extends React.Component{
    constructor(){
        super();
    }
    goBack=()=>{
        // 凡是由路由渲染出来的组件会默认带三个键值对：history location  match;
        this.props.history.push("/profile");
    }
    reg=()=>{
        // 注册 ：
        // 如果当前请求回来的数需要放在store中，那么该请求需要在action中发送；
        let obj = {
            username:this.refs.x.value,
            password:this.refs.y.value
        }
        goRegister("/reg",obj).then((data)=>{
            // data: 是后端返回的数据；
            // 如果后端返回的数据中有success属性，那么就跳转到home；
            if(data.success){
                alert(data.success);
            }
        });
    }
    render(){
        return <div className="login">
            <div className="login-header">
                注册
            </div>
            <div className="login-photo">
                <img src={img} alt=""/>
            </div>
            <ul className="list">
                <li><input type="username" ref="x"/></li>
                <li><input type="password" ref="y"/></li>
                <li><Link to="/login">前往登录</Link></li>
                <li><button onClick={this.reg}>注册</button></li>
            </ul>
        </div>
    }
}

import React from "react";
import {Link} from  "react-router-dom";
import "./index.less";
import img from "../../images/profile.png";
import {goLogin} from "../../api/login";
export default class Login extends React.Component{
    constructor(){
        super();
    }
    goBack=()=>{
        // 凡是由路由渲染出来的组件会默认带三个键值对：history location  match;
        this.props.history.push("/profile");
    }
    login=()=>{
        // 登录 ：
        // 如果当前请求回来的数需要放在store中，那么该请求需要在action中发送；
        let obj = {
            username:this.refs.x.value,
            password:this.refs.y.value
        }
        goLogin("/login",obj).then((data)=>{
            // data: 是后端返回的数据；
            // 如果后端返回的数据中有success属性，那么就跳转到home；
            if(data.success){
                this.props.history.push("/home");
            }else{
                alert(data.error);
            }
        })
    }
    render(){
        return <div className="login">
                  <div className="login-header">
                      <i className="iconfont icon-fanhui" onClick={this.goBack}></i>
                      登录
                  </div>
                <div className="login-photo">
                    <img src={img} alt=""/>
                </div>
                 <ul className="list">
                     <li><input type="username" ref="x"/></li>
                     <li><input type="password" ref="y"/></li>
                     <li><Link to="/register">前往注册</Link></li>
                     <li><button onClick={this.login}>登录</button></li>
                 </ul>
               </div>
    }
}

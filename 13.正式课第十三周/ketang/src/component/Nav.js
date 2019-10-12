import React from "react";
import "./nav.less";
import {NavLink} from "react-router-dom";
export default class Home extends React.Component{
    constructor(){
        super();
    }
    render(){
        return <div className="nav-footer">
            <NavLink to="/home">
                <i className="iconfont icon-xiazai45"></i>
                <span>首页</span>
            </NavLink>
            <NavLink to="/lesson">
                <i className="iconfont icon-course"></i>
                <span>课程</span>
            </NavLink>
            <NavLink to="/profile">
                <i className="iconfont icon-gerenzhongxin"></i>
                <span>个人中心</span>
            </NavLink>
        </div>
    }
}

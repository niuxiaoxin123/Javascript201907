import React from "react";
import "./index.less";
import img from "../../images/profile.png";
import {Link} from "react-router-dom";
export default class Profile extends React.Component{
    constructor(){
        super();
    }
    render(){
        return <div className="profile">
                <img src={img} alt=""/>
                <Link to="/login">登录</Link>
            </div>
    }
}

import React from "react";
import Nav from "./Nav";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css"
// 这是最外层的组件
export default class App extends React.Component{
    constructor(){
        super();
    }
    render(){
        return <div className="container">
            <div className="row">
                <Nav/>
                {this.props.children}
            </div>
        </div>
    }
}


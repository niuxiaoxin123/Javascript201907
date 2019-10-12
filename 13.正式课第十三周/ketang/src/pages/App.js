import React from "react";
import Nav from "../component/Nav"
export default class App extends React.Component{
    constructor(){
        super();
    }
    render(){
        return <div>
            {this.props.children}
            <Nav/>
        </div>
    }
}

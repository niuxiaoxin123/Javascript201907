import React from "react";
export default class Detail extends React.Component{
    constructor(){
        super();
    }
    render(){
        let user = JSON.parse(localStorage.getItem("users"));
        let curId = this.props.match.params.id;
        let curUser = user.filter((item)=>item.id==curId);
        return <div>{curUser[0].name}</div>
    }
}

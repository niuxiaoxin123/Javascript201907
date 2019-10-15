
import React from "react";
export default class HomeContent extends React.Component{
    constructor(){
        super();
    }
    render(){
        return <div className="home-content">
            <p>全部课程</p>
            <ul>
                {this.props.lessons.map((item,index)=>{
                    return <li key={index}>
                        <img src={item.url} alt=""/>
                        <p>价格：{item.price}</p>
                    </li>
                })}
            </ul>
        </div>
    }
}

import React from "react";
export default class SliderDots extends React.Component{
    constructor(){
        super();
    }
    render(){
        return <ul className="focus">
            {this.props.imgs.map((item,index)=>{
                if(index===this.props.imgs.length-1){
                    // 最后一次
                    return null;
                }
                // state.index   0
                //state.index     1
                //state.index     2
                //state.index     3

                // this.props.index
                //  index
                return <li className={this.props.index===index||this.props.index-index===3?"active":""} key={index} onClick={()=>{this.props.turn(index-this.props.index)}}></li>
            })}
        </ul>
    }
}

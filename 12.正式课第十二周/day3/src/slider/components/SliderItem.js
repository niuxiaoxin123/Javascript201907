import React from "react";
export default class SliderItem extends React.Component{
    constructor(){
        super();
    }
    render(){
        let style={
            left:-this.props.index*400+"px",
            transition:"left 0.5s linear"
        }
        return <ul className="wrapper" style={style} ref={this.props.slider}>
            {/*将图片的数据映射成每一个li*/}
            {this.props.imgs.map((item,index)=>{
                return <li key={index}>
                    <img src={item} alt=""/>
                </li>
            })}
        </ul>
    }
}


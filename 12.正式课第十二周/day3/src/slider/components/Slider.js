import React from "react";
import SliderItem from "./SliderItem"
import SliderArrow from "./SliderArrow"
import SliderDots from "./SliderDots"
export default class Slider extends React.Component{
    constructor(){
        super();
        this.state={index:0}
    }
    componentDidMount(){
        // 当真实DOM渲染完毕，开启轮播；
        this.go();
    }
    turn=(step)=>{
        // 改状态
        if(this.state.index===3){
            this.slider.style.left="0px";
            this.slider.style.transitionDuration="0s";// 让过渡动画属性设置成0s;
            // 强制刷新重绘
            let left = window.getComputedStyle(this.slider).left;
            this.slider.style.transitionDuration="0.5s";
            this.setState({index:1});
            return;
        }
        if(this.state.index+step===-1){// 为了拦截点左箭头，并且当前是第一张的情况
            this.slider.style.left="-1200px";
            this.slider.style.transitionDuration="0s";// 让过渡动画属性设置成0s;
            // 强制刷新重绘
            let left = window.getComputedStyle(this.slider).left;
            this.slider.style.transitionDuration="0.5s";
            this.setState({index:2});
            return;

        }
        this.setState({index:this.state.index+step});
    }
    go=()=>{
        this.timer=setInterval(()=>{
            this.turn(1)
        },2000)
    }
    getSlider=(x)=>{
        // 把Ul这个元素给了当前实例的slider属性； 跨组件获取元素的方式
        // console.log(x);
        // this --> 当前组件的实例，给当前实例新增了自定义的属性
        this.slider=x;
    }
    render(){
        return <div className="container" onMouseOver={()=>{clearInterval(this.timer)}} onMouseOut={()=>{this.go()}}>
            <SliderItem imgs={this.props.img} index={this.state.index} slider={this.getSlider}/>
            <SliderArrow turn={this.turn}/>
            <SliderDots/>
        </div>
    }
}


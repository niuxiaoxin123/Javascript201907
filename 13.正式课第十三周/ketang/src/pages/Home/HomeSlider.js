import React from "react";
import ReactSwipe from "react-swipe";
export default class HomeSlider extends React.Component{
    constructor(){
        super();
        this.state={index:0}
    }
    fn=(index)=>{
        this.setState({index})
    }
    render(){
        let reactSwipeEl;
        return <div className="home-slider">
            <ReactSwipe
                className="carousel"
                swipeOptions={{ continuous: true,auto:2000,callback:this.fn}}
                //ref={el => (reactSwipeEl = el)}
                key={this.props.sliders.length}
            >
                {this.props.sliders.map((item,index)=>{
                    return <div key={index}>
                        <img src={item} alt=""/>
                    </div>
                })}
            </ReactSwipe>
            <div className="focus">
                {this.props.sliders.map((item,index)=>{
                    return <span key={index} className={this.state.index===index?"active":""}></span>
                })}
            </div>
        </div>
    }
}

import React from "react";
import "./index.less";
import HomeHeader from "./HomeHeader";
import HomeSlider from "./HomeSlider";
import HomeContent from "./HomeContent";
import {connect} from "react-redux";
import actions from "../../store/action/index";
import {downUpdate} from "../../common/utils";
class Home extends React.Component{
    constructor(){
        super();
    }
    componentWillMount(){
        this.props.getSliderData();
        this.props.getLesson();
    }
    componentDidMount(){
        downUpdate(this.ele,this.props.getLesson)
        // this.ele.style.height=document.documentElement.clientHeight-112+"px";
    }
    render(){
        return <div>
            <HomeHeader change={this.props.changeType}/>
            <div ref={(x)=>this.ele=x} className="container">
                <HomeSlider sliders={this.props.home}/>
                <HomeContent lessons={this.props.lesson.list}/>
            </div>
        </div>
    }
}
export default  connect(state=>({...state.home}),actions)(Home)

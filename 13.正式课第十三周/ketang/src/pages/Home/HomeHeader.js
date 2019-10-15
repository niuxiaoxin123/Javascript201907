import React from "react";
import img from "../../images/logo.png";
import { Transition } from 'react-transition-group';
export default class HomeHeader extends React.Component{
    constructor(){
        super();
        this.state={show:true}
    }
    changeShow=()=>{
        this.setState({
            show:!this.state.show
        })
    }
    render(){
        const duration = 300;
        const defaultStyle = {
            transition: `opacity ${duration}ms ease-in-out`,
            opacity: 0,
        }
        const transitionStyles = {
            entering: { opacity: 1 },
            entered:  { opacity: 1 },
            exiting:  { opacity: 0 },
            exited:  { opacity: 0 },
        };
        return <div className="home-header">
            <img src={img} alt=""/>
            {this.state.show?<i className="iconfont icon-liebiao" onClick={this.changeShow}></i>:<i className="iconfont icon-cha" onClick={this.changeShow}></i>}
            <Transition in={!this.state.show} timeout={duration}>
                {state => (
                   <ul className="home-course" style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                }} onClick={(e)=>{this.props.change(e.target.dataset.type)}}>
                        <li data-type="all">全部课程</li>
                        <li data-type="vue">Vue课程</li>
                        <li date-type="react">React课程</li>
                    </ul>
                )}
            </Transition>
        </div>
    }
}

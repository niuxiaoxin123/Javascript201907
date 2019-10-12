import React from "react";
import "./index.less";
import HomeHeader from "./HomeHeader";
import HomeSlider from "./HomeSlider";
import HomeContent from "./HomeContent";
export default class Home extends React.Component{
    constructor(){
        super();
    }
    render(){
        return <div>
            <HomeHeader/>
            <HomeSlider/>
            <HomeContent/>
        </div>
    }
}

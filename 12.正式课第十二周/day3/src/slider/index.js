import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Slider from "./components/Slider";
// 图片被webpack打包之后，先把图片进行存储到一个数组中；

let images = [require("./images/1.jpg"),require("./images/2.jpg"),require("./images/3.jpg"),require("./images/1.jpg")];
ReactDOM.render(<Slider img={images}/>, document.querySelector("#root"));

import React from "react";
import ReactDOM from "react-dom";
// 1. 组件之间数据传递
// 1. props    2. redux  : 各个组件之间数据共享   3. context 上下文
// App 的子组件是Header;Header 的子组件是Title;
import App from "./App";
ReactDOM.render(<App/>, document.querySelector("#root"));


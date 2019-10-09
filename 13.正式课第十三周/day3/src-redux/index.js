import React from "react";
import ReactDOM from "react-dom";
import Counter from "./page/1.counter"
import Compute from "./page/2.compute";
import {Provider} from "react-redux";
import store from "./store/index"
ReactDOM.render(
<div>

    <Provider store={store}>
        <Counter/>
        <div>122</div>
        <Compute/>
    </Provider>
</div>,document.querySelector("#root"));


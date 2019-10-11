import React from "react";
import ReactDOM from "react-dom";
import Counter from "./component/Counter";
import {Provider} from "react-redux";
import store from "./store/index";
ReactDOM.render(<div>
    <Provider store={store}>
        <Counter/>
    </Provider>
</div>, document.querySelector("#root"));

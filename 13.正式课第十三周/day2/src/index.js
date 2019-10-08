import React from "react";
import ReactDOM from "react-dom";
import Counter from "./page/Counter";
import Todo from "./page/Todo"
ReactDOM.render(<div>
    <Counter/>
    <Todo/>
</div>, document.querySelector("#root"));

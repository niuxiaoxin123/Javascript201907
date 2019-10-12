import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router,Switch,Route} from "react-router-dom";
import App from "./pages/App";
import Home from "./pages/Home/index";
import Lesson from "./pages/Lesson/index";
import Profile from "./pages/Profile/index";
ReactDOM.render(<Router>
    <App>
        <Switch>
            <Route path="/" exact={true} component={Home}/>
            <Route path="/home" component={Home}/>
            <Route path="/lesson"  component={Lesson}/>
            <Route path="/profile"  component={Profile}/>
        </Switch>
    </App>
</Router>,document.querySelector("#root"));

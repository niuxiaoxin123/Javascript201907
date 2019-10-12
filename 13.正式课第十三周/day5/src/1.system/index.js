import React from "react";
import ReactDOM from "react-dom";
import {HashRouter as Router,Route,Switch} from "react-router-dom";
import Home from "./component/Home";
import Profile from "./component/Profile";
import User from "./component/User";
import App from "./component/App"
ReactDOM.render(<Router>
    <Switch>
        <App>
            <Route path="/"  exact={true} component={Home}/>
            <Route path="/home" component={Home}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/user" component={User}/>
        </App>
    </Switch>
</Router>,document.getElementById("root"));
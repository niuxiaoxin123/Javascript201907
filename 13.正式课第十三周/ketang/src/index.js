import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router,Switch,Route} from "react-router-dom";
import App from "./pages/App";
import Home from "./pages/Home/index";
import Lesson from "./pages/Lesson/index";
import Profile from "./pages/Profile/index";
import Login from "./pages/Login/index";
import Register from "./pages/Register/index";
import {Provider} from "react-redux";
import store from "./store/index";
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App>
                <Switch>
                    <Route path="/" exact={true} component={Home}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/lesson"  component={Lesson}/>
                    <Route path="/profile"  component={Profile}/>
                    <Route path="/login"  component={Login}/>
                    <Route path="/register"  component={Register}/>
                </Switch>
            </App>
        </Router>
    </Provider>
   ,document.querySelector("#root"));

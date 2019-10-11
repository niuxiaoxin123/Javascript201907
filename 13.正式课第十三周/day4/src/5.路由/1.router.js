import React from "react";
import ReactDOM from "react-dom";
import {HashRouter,Route,Switch,Link} from "react-router-dom";
// HashRouter 是一个组件
let Home=()=><div>
    Home
    <Link to="/list">去吧</Link>
</div>;
let List=()=><div>list</div>;
let Personal=()=><div>Personal</div>;
let Found=()=><div> 404 Not Found</div>;

// 在react-router-dom HashRouter 可以放多个子组件
// 在react中只要包含该路由，就会显示出来；
// Switch : 只要匹配到一个符合要求的，都不再向下匹配；只要匹配成功都不再向下匹配
// exact : 放在Route的行间属性上；只要当前hash值跟path完全一样，才生效；
ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route  path="/" exact={true} component={Home}/>
            <Route  path="/home" exact={true} component={Home}/>
            <Route  path="/list" component={List}/>
            <Route  path="/person" component={Personal}/>
            <Route component={Found}/>
        </Switch>
    </HashRouter>,
document.querySelector("#root"));

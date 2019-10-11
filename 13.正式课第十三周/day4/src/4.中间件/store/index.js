import {createStore,applyMiddleware} from "redux";
import reducer from "./reducer/index";
import logger from "redux-logger";
import reduxThunk from "redux-thunk";
import reduxPromise from "redux-promise";
// 1.导入中间件
// 2. 应用中间件
// 1. redux-logger : 打印更改状态之前的状态和更改之后的新状态；以及这次更改状态的action；

// 2. redux-thunk
let store = createStore(reducer,applyMiddleware(logger,reduxThunk,reduxPromise));

export default store;

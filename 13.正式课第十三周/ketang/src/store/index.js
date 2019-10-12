import {createStore,applyMiddleware} from "redux";
import logger from "redux-logger";
import reduxThunk from "redux-thunk";
import reduxPromise from "redux-promise";
import reducer from "./reducer/index"
let store = createStore(reducer,applyMiddleware(logger,reduxThunk,reduxPromise));
export default store;
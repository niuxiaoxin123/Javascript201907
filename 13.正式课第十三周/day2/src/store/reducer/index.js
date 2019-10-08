import {combineReducers} from "redux";
import counter from "./counter.js";
import todo from "./todo";
let reducer = combineReducers({
    counter,
    todo
});
export default reducer;
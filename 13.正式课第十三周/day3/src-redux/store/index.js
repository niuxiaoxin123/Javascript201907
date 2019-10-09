import {createStore} from "redux";
import reducer from "./reducers/index"
let store = createStore(reducer);
export default store;

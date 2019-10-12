import {combineReducers} from "redux";
let initState={
    type:"all"
}
function home(state=initState,action) {
    return state;
}
let reducer = combineReducers({
    home
});
export default reducer;

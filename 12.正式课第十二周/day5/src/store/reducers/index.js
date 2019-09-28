import * as types from "../action-type"
import counter from "./1.counter";
import todo from "./2.todo";

let combineReducers = (reducers)=>{
    return (state={},action)=>{
        let obj = {};
        for(let key in reducers){
            obj[key]=reducers[key](state[key],action)
        }
        return obj;
    }
};

// store :{counter:{num:0},todo1:{todo1:[]}}
// store.getState().counter.num

let reducer = combineReducers({
    counter,
    todo
});

export default reducer;
import * as types from "../action-type"
let initState = {num:0};
function counter(state=initState,action) {
    switch (action.type){
        case types.ADD_COUNT:
            return {...state,num:state.num+action.n};
        case types.MIN_COUNT:
            return {...state,num:state.num-action.n}
    }
    return state;
}
export default counter;
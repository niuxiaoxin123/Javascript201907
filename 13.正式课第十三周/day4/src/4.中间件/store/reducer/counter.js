import * as Types from "../action-type"
let initState={
    num:100
};
function counter(state=initState,action) {
    switch (action.type){
        case Types.ADD_COUNT:
            return {...state,num:state.num+action.n};
        case Types.MIN_COUNT:
            return {...state,num:state.num-action.m}

    }
    return state;
}
export default counter;

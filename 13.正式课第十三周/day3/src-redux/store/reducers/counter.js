import * as Types from "../action-type"
let initState ={num:0};

function counter(state=initState,action) {
    switch (action.type){
        case Types.ADD_COUNT:
            return {...state,num:state.num+1};
        case Types.MIN_COUNT:
            return {...state,num:state.num-1}
    }
    return state;
}
export default counter;

import {combineReducers} from "redux";
import * as Types from "../action-type";
let initState={
    type:"all",
    home:[],
    lesson:{
        offset:0,
        limit:5,
        list:[],
        hasMore:true
    }
    // 等到请求回来数据，然后再把数据放到store中；
};
function home(state=initState,action) {
    switch(action.type){
        case Types.CHANGE_TYPE:
            return {...state,type:action.t};
        case Types.SLIDER_DATA:
            return {...state,home:action.home};
        case Types.LESSON_DATA:
            return {...state,lesson:{offset:state.lesson.offset+state.lesson.limit,limit:5,list:[...state.lesson.list,...action.data.list],hasMore:action.data.hasMore}}
    }
    return state;
}
let reducer = combineReducers({
    home
});
export default reducer;

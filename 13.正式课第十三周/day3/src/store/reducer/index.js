import {combineReducers} from "redux";
import * as Types from "../action-type";
let initState={
    // 根据当前state中的type,判断显示的数据
    type:"all",
    todos:[
        {id:1,isSelected:false,val:"要吃饭"},
        {id:2,isSelected:false,val:"要学习"}
    ]
};
function todo(state=initState,action) {
    switch (action.type){
        case Types.ADD_TODO:
            return {...state,todos:[...state.todos,{id:Date.now(),isSelected:false,val:action.value}]}
        case Types.DEL_TODO:
            let newTodo=state.todos.filter(item=>item.id!==action.id);
            return {...state,todos:newTodo}
        case Types.CHAN_VAL:
            // 映射一个新的数组
            let newTodos= state.todos.map((item,index)=>{
                if(item.id===action.id){
                    item.isSelected=!item.isSelected;
                }
                return item;
            });
            return {...state,todos:newTodos};
        case Types.CHANGE_TYPE:
            return {...state,type:action.typeStr}
    }
    return state;
}
let reducer = combineReducers({
    todo
});
export default reducer;


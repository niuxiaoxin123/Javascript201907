import * as Types from "../action-type";
export default {
    addTodo(value){
        return {type:Types.ADD_TODO,value}
    },
    delTodo(id){
        return {type:Types.DEL_TODO,id}
    },
    change(id){
        return {type:Types.CHAN_VAL,id}
    },
    changeT(typeStr){
        return {type:Types.CHANGE_TYPE,typeStr}
    }
}

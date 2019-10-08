import * as Types from "../action-type";
export default {
    add(n){
        return {type:Types.ADD_COUNT,n}
    },
    min(){
        return {type:Types.MIN_COUNT}
    }
}

import * as Types from "../action-type";
export default {
    add(){
        return {type:Types.ADD_COUNT}
    },
    min(){
        return {type:Types.MIN_COUNT}
    }

}

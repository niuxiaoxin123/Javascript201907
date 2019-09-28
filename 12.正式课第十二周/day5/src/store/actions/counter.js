// 这是一个动作，存放dispatch的参数；
import * as types from "../action-type";
export default {
    add(n){
        // 请求一般都在这个里面发送；
        return {type:types.ADD_COUNT,n:n}
    },
    min(n){
        // 减1
        return {type:types.MIN_COUNT,n:n}
    }
}

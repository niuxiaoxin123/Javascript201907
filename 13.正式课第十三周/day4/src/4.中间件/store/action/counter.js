import * as Types from "../action-type";
export default {
    add(n){
        // action不支持异步的派发动作；
        /*let t;
        setTimeout(()=>{
            t={type:Types.ADD_COUNT,n}
        },500);
        return t;*/
        // 可以返回一个函数，这个函数执行时，会接收两个实参
        return function (dispacth,getState) {
            // dispatch ===store.dispatch
            // getState === store.getState
            // $.ajax()
            // 在项目中，可以在action中发送器异步的请求，等请求回来的数据再修改store中state；
            setTimeout(()=>{
                dispacth({type:Types.ADD_COUNT,n})
            },2000);
        }
    },
    min(m){
        // payload可以是一个promise的实例；
        // redux-promise : 让派发的动作类型支持promise；
        //resolve 的值是多少，最后，payload的值就是多少
        /*return {
            type:Types.MIN_COUNT,
            payload: new Promise(function (resolve,reject) {
                setTimeout(()=>{
                    reject(m)
                },3000)
            }).then(function (val) {
                return val;
            },function (val) {
                return val;
            })
        }*/
        // 也可以直接返回一个promise的实例；但是resolve的实参就是派发的动作
        // 如果只是返回一个promise实例，那么默认只能从pending到成功；
        return new Promise(function (resolve,reject) {
            setTimeout(()=>{
                resolve({type:Types.MIN_COUNT,m})
            },2000)
        });
    }
}

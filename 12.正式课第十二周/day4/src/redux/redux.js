
// 1. state   2. getState  3.dispatch  4.subscribe
function createStore(reducer) {
    let state;
    let getState=()=>JSON.parse(JSON.stringify(state));
    let listeners = [];
    let dispatch=(action)=>{
        // 只有第一次执行dispatch时，state是undefined；
        state=reducer(state,action);
        listeners.forEach((item,index)=>{
            if(typeof item==="function"){
                item();
            }
        })
    };
    dispatch({});
    // subscribe默认返回一个取消订阅的方法
    let subscribe=(fn)=>{
        listeners.push(fn);
        return ()=>{
            listeners=listeners.filter(item=>item!==fn);
        }
    }
    return {
        getState,
        dispatch,
        subscribe
    }
}
function reducer(state=initState,action) {

}
let store =createStore(reducer);
let f1 = store.subscribe(fn1);
let f2 = store.subscribe(fn2);
f1();
export default createStore;

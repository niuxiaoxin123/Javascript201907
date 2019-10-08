// 组件的数据传递
// redux : 统一数据管理
// state  getState  dispatch  subscribe
let createStore =(reducer)=>{
    let state;
    // 获取当前store中的state存储的数据；并且进行了深度克隆，防止外界进行修改；必须使用dispatch
    let getState=()=>JSON.parse(JSON.stringify(state));
    // dispatch
    let listeners=[];
    let dispatch=(action)=>{
        // 用reducer的返回值覆盖store中的state
        state=reducer(state,action);
        listeners.forEach(item=>{
            if(typeof item==="function"){
                item();
            }
        })
    }
    dispatch({});// 给当前store中的state赋默认值；
    // 订阅： 当数据更新时，会执行订阅的函数；
    let subscribe=(fn)=>{
        listeners.push(fn);
        return ()=>{
            // 返回一个取消订阅的函数
            listeners=listeners.filter(item=>item!==fn)
        }
    }
    return {
        getState,
        dispatch,
        subscribe
    }
}
let combineReducers=(reducers)=>{
    return (state={},action)=>{
        let obj = {};
        for(let key in reducers){
            obj[key]=reducers[key](state[key],action)
        }
        return obj;
    }
}
export {
    createStore,
    combineReducers
};


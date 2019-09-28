function createStore(reducer){// 是一个函数
    // state  getState  dispatch   subscribe
    let  state;
    let getState=()=>JSON.parse(JSON.stringify(state));
    let listeners = [];
    let dispatch=(action)=>{
        //1. 通过动作修改当前仓库中的state;
        //2. 可以让订阅的方法执行
        state=reducer(state,action);
        listeners.forEach(item=>{
            if(typeof item==="function"){
                item();
            }
        })
    }
    dispatch({});
    let subscribe=(fn)=>{ // subscribe返回一个取消订阅的方法
        listeners.push(fn);
        return ()=>{
            listeners=listeners.filter(item=>item!==fn)
        }
    }
    return {
        getState,
        dispatch,
        subscribe
    }
}
export default createStore;

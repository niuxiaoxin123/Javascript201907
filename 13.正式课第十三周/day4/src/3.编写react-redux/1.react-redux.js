// Provider  connect;
{/*<Provider store={store}>
    <div></div>
    <div></div>
    <h1></h1>
</Provider>
import React from "react";*/}
import PropTypes from "prop-types";
class Provider extends React.Component{
    constructor(){
        super();
    }
    static childContextTypes={
        // 定义好store的类型
        store:PropTypes.object
    }
    getChildContext(){
        // 记得返回store；
        return {store:this.props.store}
    }
    render(){
        return  this.props.children;
    }
}
// 函数
let connect=(mapStateToProps,mapDispatchToProps)=>(Component)=>{
    return class A extends React.Component{
        constructor(){
            super();
            this.state=mapStateToProps(this.context.store.getState())
        }
        static contextTypes={
            store:PropTypes.object
        }
        componentDidMount(){
            this.unscribe=this.context.store.subscribe(()=>{
                this.setState(mapStateToProps(this.context.store.getState()))
            })
        }
        componentWillUnmount(){
            this.unscribe();
        }
        render(){
            return <Component {...this.state} {...mapDispatchToProps(this.context.store.dispatch)}/>
        }
    }
}
connect(state=>({...state}),dispatch=>{return {add:()=>dispatch({})}});
export {Provider,connect};

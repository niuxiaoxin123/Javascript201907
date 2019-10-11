import React from "react"
let Local=(key)=>(Component)=>{
    // key : user 或pass
    // Component : Username和Password
    return class A extends React.Component{
        constructor(){
            super();
            this.state={[key]:""}
        }
        componentWillMount(){
            // 动态设置属性名；采用[key]的方式
            this.setState({[key]:localStorage.getItem(key)})
        }
        render(){
            return <Component {...this.state}/>
        }
    }
}
export default Local;
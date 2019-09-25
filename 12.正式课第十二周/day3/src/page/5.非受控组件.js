/**
 * Created by 39753 on 2019/9/25.
 */
import React from "react";
import ReactDOM from "react-dom";
class Panel extends React.Component{
    constructor(){
        super();
        this.state={result:""}
    }
    add=()=>{
        //console.log(this.refs.a);// 就是当前的input
        //console.log(this.refs.b);// 就是当前的input
        let result = Number(this.refs.a.value)+Number(this.b.value);
        this.setState({result})
    }
    render(){
        return <div>
            <input type="text" onChange={this.add} ref="a"/>+
            <input type="text" onChange={this.add} ref={(x)=>{this.b=x}}/>={this.state.result}
                {/*ref="a"==>this.refs.a*/}
                {/*ref={(x)=>{this.b=x}}==>this.b*/}
                </div>
    }
}
ReactDOM.render(<Panel/>, document.querySelector("#root"));


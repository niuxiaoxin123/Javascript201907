import React from "react";
import Local from "./Local";
class Password extends React.Component{
    render(){
        return <div>
            <input type="text" value={this.props.pass} onChange={()=>{}}/>
        </div>
    }
}
export default   Local("pass")(Password);
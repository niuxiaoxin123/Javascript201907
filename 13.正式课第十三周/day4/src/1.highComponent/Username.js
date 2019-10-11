import React from "react";
import Local from "./Local";
 class Username extends React.Component{
     render(){
         return <div>
             <input type="text" value={this.props.user} onChange={()=>{}}/>
         </div>
     }
}
export default Local("user")(Username);

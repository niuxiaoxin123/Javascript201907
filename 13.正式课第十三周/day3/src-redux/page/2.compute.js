import React from "react";
import store from "../store/index";
import {connect} from "react-redux";
 class Compute extends React.Component{
  /*  constructor(){
        super();
        this.state={n:store.getState().counter.num}
    }*/
 /*   componentDidMount(){
        store.subscribe(()=>{
            this.setState({n:store.getState().counter.num})
        })
    }*/
    render(){
        return <div>
            {this.props.num%2===0?"偶数":"奇数"}
        </div>
    }
}
export default connect(state=>({...state.counter}))(Compute)


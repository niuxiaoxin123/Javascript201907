import React,{Component} from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";// 属性校验模块；


class Student extends Component{
    static propTypes={
        age:PropTypes.number,
        name:PropTypes.array
        /*optionalArray: PropTypes.array,
        optionalBool: PropTypes.bool,
        optionalFunc: PropTypes.func,
        optionalNumber: PropTypes.number,
        optionalObject: PropTypes.object,
        optionalString: PropTypes.string,
        optionalSymbol: PropTypes.symbol,*/
    }
    static defaultProps={
        //定义默认属性
        name:"珠峰201教室",
        age:80
    }
    constructor(){
        super();
    }
    render(){
        // 属性是通过props传递过来的，不能直接进行修改；
        let a =0;
        if(this.props.age>9){
             a = 1;
        }
        return <div>
                    {this.props.age}{this.props.name}
               </div>
    }
}
ReactDOM.render(<Student age="12"/>, document.querySelector("#root"));

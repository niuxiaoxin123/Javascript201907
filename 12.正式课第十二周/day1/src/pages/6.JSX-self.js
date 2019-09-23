
 class Element{
    constructor(type,attr,children){
        // this --> 当前Element的实例；
        // 给实例新增键值对；
        this.type=type;
        this.props = {...attr,children}
    }
    render(){
        // render是Element实例的原型上的属性方法
        // 把虚拟的DOM转成真实的DOM，并且需要把真实的DOM返回；
        let ele = document.createElement(this.type);// 根据元素的类型创建标签；
        for(let key in this.props){
            if(key!=="children"){
                // 对于特殊属性的处理；
                if(key==="class"){
                    key = "className";
                }else if(key==="for"){
                    key = "htmlFor";
                }
                ele.setAttribute(key,this.props[key]);
            }else{
                for(let i=0;i<this.props.children.length;i++){
                    let cur = this.props.children[i];
                    let curEle = cur instanceof Element?cur.render():document.createTextNode(cur);// 把文本转成文本节点；
                    ele.appendChild(curEle);
                }
            }
        }
        return ele;
    }
 }

let obj ={
    createElement(type,attr,...children){
        // 创建的虚拟的DOM是Element的一个实例；
        return new Element(type,attr,children)
    }
};
// render : 1将虚拟的DOM转成真实的DOM 2.把真实DOM插入到container中；
let objDOM={
    render(ele,container){
        // ele : 虚拟的DOM对象
        // container： 将要挂载的DOM元素；
        // ele : 是Element的一个实例；
        container.appendChild(ele.render());
    }
};
let a = obj.createElement("div",{a:1,b:1},"很好",obj.createElement("p",{c:1},"他他他"));
objDOM.render(a,document.getElementById("root"));
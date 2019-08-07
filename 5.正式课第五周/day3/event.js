function EventFire() {}
EventFire.prototype.on=function (type,fn) {
    // 把方法订阅到这个EventFire这个类的实例上；
    if(!this[type]){
        // 第一次执行，给obj新增键值对，并且属性值是[];
        this[type]=[];
    }
    let ary = this[type];
    //遍历ary中的数组成员，判断是否绑定过；
    for(let i=0;i<ary.length;i++){
        if(ary[i]===fn){
            return;
        }
    }
    ary.push(fn);
    // 为了实现链式调用on订阅的方法；
    return this;
}
EventFire.prototype.emit=function (type) {
    let a = this[type];
    if(a){//如果是undefined，不进循环
        for(let i=0;i<a.length;i++){
            if(typeof a[i]==="function"){
                a[i].call(this);
            }
        }
    }
}
EventFire.prototype.off=function (type,fn) {
    let ary = this[type];
    for(let i=0;i<ary.length;i++){
        if(fn===ary[i]){
            //ary.splice(i,1);数组塌陷；
            ary[i]=null;
            return;
        }
    }
}
function Drag(ele) {
    // this-->实例；Drag的一个实例
    // 把元素放在Drag的实例上；
    this.ele = ele;
    this.ele.onmousedown=this.down.bind(this);
}
// 原型继承
Drag.prototype=new EventFire();
Drag.prototype.down=function (e) {
    // console.log(this);// this--> Drag的实例
    this.x=e.clientX;
    this.y=e.clientY;
    this.l = parseFloat(getComputedStyle(this.ele).left);
    this.t = parseFloat(getComputedStyle(this.ele).top);
    document.onmousemove=this.move.bind(this);
    document.onmouseup = this.up.bind(this);
    this.emit("selfdown");
}
Drag.prototype.move=function (e) {
    let changeX = e.clientX-this.x+this.l;
    let changeY = e.clientY-this.y+this.t;
    this.ele.style.left = changeX+"px";
    this.ele.style.top= changeY+"px";
    this.emit("selfmove")
}
Drag.prototype.up = function () {
    document.onmousemove=null;
    document.onmouseup =null;
    this.emit("selfup");
}
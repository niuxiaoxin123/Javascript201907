/*function Fn() {
    this.a = 100;
}
Fn();
Fn.prototype.sum = function(){}
new Fn();*/

/*function G() {
    this.c = 1;
    var r = 9;
}
G.k = 19;
let g = new G();
console.log(g.k);*/

/*
class Fn{
    static a=100;// 定义私有属性；
    constructor(){
        // this==> 实例
        this.a =100;
        let b = 1;
    }
    sum(){//会放在Fn的原型上；

    }
    yy(){

    }
}
new Fn();


let obj ={
    fn(){

    },
    f() {

    }
}*/


class A{
    static a = 100;
    constructor(){
        this.w=0;
    }
    sum(){

    }
}
// class 继承的是私有和公有属性
class B extends A{
    constructor(){
        super();// 需要在super下面执行跟this相关的代码；
        this.num = 100;
    }
    foo(){

    }
}
let b = new B;
console.log(b);

// 入口文件  .vue
import Vue from "vue";
// 会默认解析成vue.runtime.js,这个js相对于vue.js小6Kb;
// vue.js可以解析template属性；但是vue.runtime.js不可以；
import App from "./App.vue";

new Vue({
    el:"#app",
    //render:h=>h(App)// 渲染函数；
    render:function (h) {
        console.log(h(App));// 函数
        // h: 是一个函数，该函数的返回值就是一个虚拟的DOM对象vNode;
        return  h(App)
    }
});



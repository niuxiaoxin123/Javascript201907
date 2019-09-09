import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);// 第三方模块需要调用Vue的use方法；
import Home from "../views/Home.vue";
import List from "../views/List.vue";
import Collect from "../views/Collect.vue";
import Detail from "../views/Detail.vue";
import Add from "../views/Add.vue";


export default new Router({
    routes:[
        {path:"/home",component:Home},
        {path:"/list",component:List},
        {path:"/list/:id",component:Detail,name:"Detail"},
        {path:"/collect",component:Collect},
        {path:"/add",component:Add},
        {path:"/",component:Home}
    ]
});


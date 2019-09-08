import Vue from 'vue'
import App from './App.vue';
import router from "./router/index.js";// 导入router,注入到new Vue中；

Vue.config.productionTip = false;
new Vue({
    el:"#app",
    router,
    render: h => h(App)
});

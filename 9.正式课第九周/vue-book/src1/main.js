import Vue from 'vue'
import App from './App.vue';
import router from "./router/index.js";// 导入router,注入到new Vue中；

import VueAwesomeSwiper from 'vue-awesome-swiper';
Vue.use(VueAwesomeSwiper);
// 导入swiper的样式
import "swiper/dist/css/swiper.css";

Vue.config.productionTip = false;
new Vue({
    el:"#app",
    router,
    render: h => h(App)
});

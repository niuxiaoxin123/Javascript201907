// 导入axios这个方法
import axios from "axios";
// 设置axios的默认的基础路径;当发送请求时，会默认将路径拼接到该默认路径的后面;
axios.defaults.baseURL="http://localhost:3000";

// axios的拦截功能;所有的请求回来都会执行这个use的回调函数
axios.interceptors.response.use(function (res) {
    return res.data;
});

// 所有的接口都会写在一个文件中

export  let  getSlider=()=>{
    return axios.get("/sliders");
};



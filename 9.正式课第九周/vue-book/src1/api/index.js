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

// home请求热门图书
export  let  getHot=()=>{
    return axios.get("/hot");
};

// 获取列表页的图书列表
export let getBooks =()=>{
    return axios.get("/books")
};

// 删除列表页的数据
export let delBook=(id)=>{
    return axios.get("/delete?id="+id);
};
// 列表页收藏请求
export let collects=(data)=>{
    // post请求，通过请求体传数据;
    // axios发送请求，直接把数据放到第二个参数上就可以
    return axios.post("/collect",data)
};

// 获取详情页中当前本书的信息
export  let getBook =(id)=>{
    return axios.get("/getOne?id="+id);
};

// 更新详情页中的信息
export let update=(data)=>{
    return axios.post("/update",data);
}

// 获取收藏页图书列表
export let  getCollect=()=>{
    // 如果请求的路径是books,并且参数是collect,server中会默认读取collect.json中的数据
    return axios.get("/books?page=collect")
}


// 添加图书的请求
export let addBook =(data)=>{
    return axios.post("/add",data)
}



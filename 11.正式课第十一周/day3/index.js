let box = document.getElementById("box");
box.onclick =function () {
    console.log(100);
}
// axios默认请求的基础路径就是当前自己电脑启动的服务器地址；
axios.post("/abc").then(function (data) {
    console.log(data.data);
});
// 一般情况下，接口文档都是后端来定；
axios.post("/order",function () {

})

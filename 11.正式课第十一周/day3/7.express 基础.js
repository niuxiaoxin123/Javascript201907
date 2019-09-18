// express : 基于node封装的框架；是一个第三方的模块；
// npm install  express  --save  / yarn  add  express
let express = require("express");
// express 是一个函数；
let  app = express();
// app 是express 的返回值；可以调用listen监听端口号；
// 这是一个get请求，请求的地址是/login,后面跟着一个回调；该回调当请求login时会执行；
// express的路由
//1 . 当请求的接口是8080  2. 执行的是get请求   3. 请求的路径是/login
app.get("/login/:a",function (req,res) {
    // 第一个参数就是请求信息，第二个参数就是响应信息；
    console.log(req);
    // req.params : 代表是路径动态的参数；
    // req.query: 请求的参数
    // req.method: 请求方式
    // req.url,pathname : 请求路径
    //res.send({a:1});// 和res.end 等价；
    // res.send : 将服务器的数据传送给客户端；如果传递不是字符串，会默认转成JSON格式字符串；
});
// 浏览器的地址栏默认发送的是get请求；
// 第二个路由
// 请求方式 get post  delete put
app.get("/register",function (req,res) {
    console.log(12);
    res.send();
});
// 不管是什么样的请求方式，只要path是order，就会执行；
app.all("/order",function (req,res) {

});
app.listen(8080,function () {
    console.log("端口号监听成功");
});




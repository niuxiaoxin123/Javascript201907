// 前端后端；
// 服务器一直处在监听的状态；监听前端发过来的请求；把前端相应的数据进行处理然后返回；
// 启动服务，后端就会处在监听的状态；当关闭服务，那么服务器就不再提供相应；上线一般在晚上；
// 核心模块： http模块；创建一个监听的服务
let http = require("http");
// server启动服务需要监听一个端口号；
let server = http.createServer(function (req,res) {
    // 当客户端访问一次，执行一次；
    //req : 请求信息
    // res : 响应信息；
    console.log(req);
});
// 当客户端访问8000端口时，会默认执行createServer中的函数；
// 0-65535个端口；
server.listen(8001,function(){
    // 当监听8000端口号成功之后，会默认调用这个函数；
});

let http = require("http");
http.createServer(function (req,res) {
    // 当服务器向客户端传输数据时，但是浏览器不知道传输过来的数据是什么格式的；
    // 如果想让浏览器知道按什么类型接收，那么需要提前通知浏览器，可以设置一个响应头给了客户端；
    // 设置响应头的客户端接收的类型以及编码格式；
    res.setHeader("content-type","text/plain;charset=utf-8");
    res.end("今天天气好晴朗");
}).listen(8080,function () {
    console.log("端口启动成功");
});
// node都是以自己的电脑作为服务器，监听自己的电脑上的端口；所以都是localhost;
// localhost === http://127.0.0.1
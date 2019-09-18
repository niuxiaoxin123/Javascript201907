let http = require("http");
let fs = require("fs");
let url = require('url');
http.createServer(function (req,res) {
    // link 的href才会发送请求；
   let {pathname}=url.parse(req.url,true);// 会默认返回一个对象
    console.log(pathname);// pathname代表的是路径；
    if(pathname=="/index.css"){
        console.log(22);
        res.setHeader("content-type","text/css");
    }
    if(pathname=="/index.js"){
        res.setHeader("content-type","application/javascript")
    }
    fs.readFile("."+pathname,"utf-8",function (err,data) {
        res.end(data);
   });
}).listen(8080,function () {
    console.log("端口号监听成功")
});

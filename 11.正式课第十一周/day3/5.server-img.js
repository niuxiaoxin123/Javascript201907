let http = require("http");
let fs = require("fs");
let url = require('url');
http.createServer(function (req,res) {
    // link 的href才会发送请求；
   let {pathname}=url.parse(req.url,true);// 会默认返回一个对象
    //console.log(pathname);// pathname代表的是路径；
    if(pathname=="/index.css"){
        console.log(22);
        res.setHeader("content-type","text/css");
    }
    if(pathname=="/index.js"){
        res.setHeader("content-type","application/javascript")
    }
    if(pathname=="/1.jpg"){
        //res.setHeader("content-type","image/jpeg");
        // 如果是图片的话，不需要设置编码格式；按照读取内容方式直接返回就可以；
        fs.readFile("."+pathname,function (err,data) {
            console.log(data);
            res.end(data);
        });
        return;
    }
    fs.readFile("."+pathname,"utf-8",function (err,data) {
        res.end(data);
   });
}).listen(8080,function () {
    console.log("端口号监听成功")
});

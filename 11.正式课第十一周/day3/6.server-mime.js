// node为了解决这个文件的content-type,有一个第三方模块是mime;会根据文件的后缀名不同，来设置不同的响应头；
// npm  init -y  npm install mime --save
let http  = require("http");
let fs = require("fs");
let mime = require("mime");
let url = require("url");
http.createServer(function (req,res) {
    let {pathname,query}=url.parse(req.url,true);
    // mime 有一个getType方法；这个方法根据文件的后缀名，返回对英的content-type类型
    res.setHeader("content-type",mime.getType(pathname));
   /* if(pathname==="/abc"){
        fs.readFile("./book.json",function (err,data) {

        });
        return;
    }*/
    fs.readFile("."+pathname,function (err,data) {
        // res.end : 只能传送字符串，buffer类型
        res.end({a:2});
    });
}).listen(8081,function () {
    console.log("8080监听成功");
});
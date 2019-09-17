let http = require("http");
let url = require("url");
let fs = require("fs");
http.createServer(function (req,res) {
    // 只要修改了server中的代码，就要重新启动
    //console.log(req)
    fs.readFile("./11.index.html","utf-8",function (err,data) {
        // 当浏览器接收HTML格式的数据时，浏览器会按照HTML类型进行解析；会把HTML文件中的结构进行描绘；
        res.end(data);
    });
}).listen(8080,function () {
    console.log("监听成功")
});

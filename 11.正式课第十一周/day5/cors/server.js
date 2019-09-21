let  express = require("express");
let app = express();

app.use(function (req,res,next) {
    // 设置允许的请求源，* 代表所有的路径
    res.header("Access-Control-Allow-Origin","*");
    // 允许的请求方式
    res.header("Access-Control-Allow-Methods","PUT,GET,POST");
    //
    next();
});
app.get("/getData",function (req,res) {
    res.send("马老师很帅");
});
app.listen(8888,function () {
    console.log("端口启动成功");
});
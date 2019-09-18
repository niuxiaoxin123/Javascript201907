let express=require("express");
let app  = express();
// app.use 一般放在请求的最上端；用于所有的请求处理
app.use(function(req,res,next){
    req.a="hello";
    next();// 执行next，才能向下执行；
});
app.get("/login/ttt",function (req,res) {
    console.log(req.a);//
});
app.listen(8080,function () {
    console.log("成功");
});
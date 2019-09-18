let express=require("express");
let app  = express();
// 如果请求路径中有id,那么会先执行这个回调函数；可以对请求信息和响应信息做一些相应的处理；
// 当login请求访问时，会先执行param传的回调；拦截了参数中有id的请求；
app.param("id",function (req,res,next) {
    console.log(99);
    req.eat=function () {
        console.log("你吃饭了吗")
    }
    next();// next执行，那么才能继续执行下一个；
});
app.get("/login/:id",function (req,res) {
    // req.params
    //console.log(100);
    req.eat();
    res.send("结束请求")
});
app.get("/register/:name",function (req,res) {
    
});
app.listen(8080,function () {
    console.log("成功")
});
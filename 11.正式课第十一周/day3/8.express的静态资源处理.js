let express=require("express");
let path = require('path');
let app  = express();
// express.static : 将静态资源文件的目录放到传给这个方法，那么就可以直接进行访问了
// app.use : 中间件
//app.use(express.static("public"));
//app.use('/static', express.static('public'))
// path.join : 将该文件绝对路径和public拼接到一起；
app.use('/static', express.static(path.join(__dirname, 'public')));
app.listen(8080,function () {
    console.log("成功")
});
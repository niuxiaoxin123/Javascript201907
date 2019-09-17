// 自定义模块  第三方模块  核心模块（内置模块）
// 核心模块： 当安装node时，就已经下载完成了；
// 文件操作模块;可以修改文件内容，读取文件内容；
// 前端js不可以修改或者是读取本地的资源文件；
let fs = require("fs");
// 1. 异步读取文件 fs.readFile
// fs.readfFile(路径，编码格式，回调函数)
// 读出来的文件是utf-8格式；readFile把读出来的内容最后传递给回调函数的第二个参数；默认是buffer数据类型，需要将utf-8传递给readFile的第二个参数；
/*fs.readFile("./a.txt","utf-8",function (err,data) {
    // 这个函数执行一定是异步的；该函数同步执行完成之后，再执行这个回调函数；
    //console.log(100);
    // console.log(err);// 代表的报错信息;如果没有读取成功，那么data返回undefined；
    console.log(data);
    // buffer由数字和字母组成 0-9a-f;
    // 每一个数字或者字母都是对应了一个buffer值；
    // 每一个汉字由3个buffer组成；
})
console.log(200);*/


// 2. readFileSync： 同步读取文件内容，不需要回调函数；直接将读取的内容作为函数的返回值返回给con;
/*let con  = fs.readFileSync("./b.txt","utf-8");
console.log(300);*/


// 3. writeFile
// fs.writeFile(路径，内容，编码格式，回调函数)
/*
fs.writeFile("./a.txt","饮料瓶好",function(err){
    console.log(err);
});
*/

/*let con = fs.readFileSync("./b.txt","utf-8");
let con1 = fs.readFileSync("./a.txt","utf-8");
fs.writeFile("./a.txt",con1+con,"utf-8",function (err) {
    
})*/
/*
fs.readFile("./b.txt","utf-8",function (err,data) {
    fs.readFile("./a.txt","utf-8",function (err,data1) {
        fs.writeFile("./a.txt",data1+data,"utf-8",function (err) {
        })
    })
})
*/

// writeFile  writeFileSync
//fs.writeFileSync("./a.txt","天气转凉","utf-8");

// 5.appendFile ： 向文件的末尾追加内容；
fs.appendFile("./a.txt","你很帅","utf-8",function (err) {});

// 6.appendFileSync






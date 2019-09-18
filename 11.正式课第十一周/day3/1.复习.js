// 1. node
// node.js :是运行在服务器上的一种语言；基础的语法是js;
// 需要在服务器上部署一个node环境；把项目部署到该服务器上，启动一个服务，当客户端访问该服务器上，node中启动的服务就可以监听到客户端的访问，然后根据客户端访问的需求，去获取不同的内容，然后发送给客户端；客户端接收到后端返回的数据，进行处理；

// 如果是通过浏览器url发送的请求，默认是get请求；会把数据展示到浏览器上；如果是HTML文件，那么浏览器直接对返回的数据解析成DOM，然后进行渲染；

// 浏览器的url地址栏
// ajax 的请求

// node
// 1.核心模块  2.第三方模块  3.自定义模块
// fs  http  url
// express
// 在node中一个js文件就是一个模块；【module.exports,require】
// require、module、exports、__dirname、__filename
//module.exports={a:1};
//module.exports={b:2}
//module.exports={b:1};
// 在该模块下默认将module.exports
//console.log(100);

// 核心模块： 是当node安装时，模块已经跟着安装完成；
// fs : 文件操作模块
// readFile(路径，编码格式，callback(err,data){})
// node 自己是单线程，但是底层是多线程；

// readFileSync

// writeFile (路径,内容，编码格式，callback(err))
// callback 当执行完成以后才会执行该回调；

// writeFileSync


// appendFile
// appendFileSync


// http : 启动服务；
http.createServer(function (req,res) {
    // 这个回调是当客户端访问一次，执行一次；
    // 1. 浏览器的地址栏
    // 2. axios\ajax
    // 3. link
    // 4. img的src script 的src;
    // 以上这些方式都会触发该回调函数；

    // req: 请求信息；包含了路径，包含了参数；
    // let {pathname,query}=url.parse(req.url,true);
    // res : 响应信息
    // res.end();结束该请求，并且把数据通过end传送给客户端；
}).listen(8080,function () {
    // 当监听成功之后执行的回调
});

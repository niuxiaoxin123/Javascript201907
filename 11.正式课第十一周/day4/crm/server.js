let fs = require("fs");
let http = require("http");
let url = require("url");
let server = http.createServer(function (req,res) {
    // 每当请求一次，那么就会执行一次；
    let {pathname,query} = url.parse(req.url,true);
    let reg = /\.(\w+)$/;// \w : 使用来匹配到有后缀名文件 的正则；
    if(reg.test(pathname)){
        // 为了排除带有后缀名的文件路径
        // 响应静态资源文件的；
        let con = fs.readFileSync("."+pathname,"utf-8")
        res.end(con);
        return;
    }
    let  obj = {code:0,msg:"请求成功"}
    let  path = "./json/custom.json";
    // 获取所有的用户信息
    if(pathname==="/getList"){
        let con = fs.readFileSync(path,"utf8");
        obj.data=con;
        res.end(JSON.stringify(obj));// 转成JSON 格式的字符串
    }
    // 删除某一个用户
    //console.log(pathname);
    if(pathname==="/removeInfo"){
         let arr = JSON.parse(fs.readFileSync(path,"utf8"));
        //console.log(query["id"]);
         arr=arr.filter(item=>item.id!=query["id"]);
        //console.log(arr);
        fs.writeFileSync(path,JSON.stringify(arr),"utf8");
         obj.msg="删除成功";
         res.end(JSON.stringify(obj));
    }

    // 新增客户
    if(pathname==="/addInfo"){
        let str = ``;
        req.on("data",function (val) {
            // 监听请求体中的所有的数据；把数据都拼接到str上；
            str+=val;
        });
        req.on("end",function () {
            // 当全部接受到了请求体中的数据，执行这个回调函数；应该为这条数据加一个id;是最后一条数据的id+1;
            //console.log(str);
            let arr = JSON.parse(fs.readFileSync(path,"utf8"));
            let id = arr[arr.length-1]["id"]+1;
            let cur = JSON.parse(str);
            cur.id= id;
            arr.push(cur);
            fs.writeFileSync(path,JSON.stringify(arr),"utf8");
        });
        obj.msg="添加成功"
        res.end(JSON.stringify(obj));
    }

    // 获取当前的这个客户信息
    if(pathname=="/getInfo"){
        let id = query["id"];
        let arr = JSON.parse(fs.readFileSync(path,"utf8"));
        let cur = arr.filter(item=>item.id==id)[0];
        obj.data=cur;
        res.end(JSON.stringify(obj));
    }
    // 更新客户信息
    if(pathname==="/updateInfo"){
        let str = ``;
        req.on("data",function (val) {
            str+=val;
        });
        req.on("end",function () {
            let cur = JSON.parse(str);
            let arr = JSON.parse(fs.readFileSync(path,"utf8"));
            for(let i=0;i<arr.length;i++){
                if(arr[i]["id"]==cur["id"]){
                    arr[i]=cur;
                }
            };
            fs.writeFileSync(path,JSON.stringify(arr),"utf8");
            obj.msg="修改成功";
            res.end(JSON.stringify(obj));
        });
    }
});
server.listen(8080,function () {
   console.log("端口监听成功")
});
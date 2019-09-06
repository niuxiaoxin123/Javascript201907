
// webpack是运行node环境下的
// 利用配置文件进行打包；
module.exports = {
    mode:"development",// 开发环境  production：生产环境
    devtool: 'eval-source-map',// 方便调试，在浏览器的source中可以看到类似源文件；
    // __dirname :代表了当前父级文件的绝对路径
    entry:__dirname+"/app/main.js",// webpack打包的入口路径；
    output:{
        path :__dirname+"/public",// 定义了打包之后文件放入哪个文件夹中
        filename:"build.js"// 打包之后的文件名称
    },
    devServer:{
        contentBase:"./public",// 服务启动的根目录
        historyApiFallback:true,// 不跳转
        inline:true,// 实时更新，
        port:8080 // 服务启动的端口号
    },
    module:{
        // module用来配置loader
        rules:[
            {
                test:/(\.jsx|\.js)$/,//用正则匹配出要用loader的文件筛选出
                use:["babel-loader"],// use要是用的loader，
                exclude:"/node_modules/" // 这个文件夹中的js文件不需要用该loader处理；
           },
            {
                test:/\.css$/,
                use:["style-loader","css-loader"]
            }
        ]
    }
};

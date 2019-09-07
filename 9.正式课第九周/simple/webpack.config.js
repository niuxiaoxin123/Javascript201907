
// webpack是运行node环境下的
// 利用配置文件进行打包；
const WebpackHtmlPlugin = require("html-webpack-plugin");
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
        port:8080, // 服务启动的端口号
        proxy:{// 代理;用于跨域就会配置
            // $.ajax({url:"api/getList"})
            // $.ajax({url:"user/getList"})
            '/api':{// 如果接口中含有api 那么这个接口就要跨域
                target:"http://localhost:9000",// 将要跨域路径地址
                secure:false,// 目标服务器是否是安全协议
                changeOrigin:false,// 是否修改请求的源头；

            }
        }
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
                test:/\.css$/,//
                // postcss-loader: 可以给浏览器对应的样式自动加前缀；
                use:["style-loader","css-loader","postcss-loader"]
            },
            {
                test:/\.less$/,
                //这个顺序是不能调整的；webpack从后往前依次进行解析；先使用less-loader将less解析成css;css将css样式注入到js文件中，style loader最后会在html中生成style标签，jS中的样式最终放到了页面上；
                use:["style-loader","css-loader","less-loader"]
            }
        ]
    },
    plugins:[
        new WebpackHtmlPlugin({
            template:__dirname+"/index.html"
        })
    ]// 配置webpack插件，这是一个数组；
};

//console.log(200);
//1. 在窗口至二级输入node  + 文件名；就是让当前文件运行在node环境下；
// 2.
// alert(); // alert是window的一个属性,在node环境中，不可以直接使用；
// 在node环境中，没有window这个大对象；只有global
//console.log(window);
//console.log(global)// 在node环境中没有window这个大对象，只有过global;这是一个全局的大对象；
//document.getElementById()

// __dirname  __filename   require
/*console.log(__dirname);// 会默认输出当前文件的父级文件夹的绝对路径；
console.log(__filename);// 输出当前文件的绝对路径
console.log(require);*/// 是一个方法；用于导入模块；
//require()
/*let y = require('./7.hello');// .js是可以省略的；另一个文件导出什么，那么就接收到*//*什么，如果不导入，那么得到一个空对象
console.log(y);*/
// module :

let y = require("./7.hello");
console.log(y);



// node的模块其实就一个js文件；在node中，一个js就是一个模块；在每个js文件中的最外层，嵌套了一个自执行函数

// (function (__dirname,__filename,require,module) {
//     let f = ()=>{
//         console.log(300);
//     }
// })();
// console.log(global);
console.log(this);
//console.log(global);





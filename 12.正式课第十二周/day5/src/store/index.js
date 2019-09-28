// 这个文件是store这个文件夹的入口，导出一个store；
import reducers from "./reducers/index.js"
import createStore from "../1.封装redux";
console.log(reducers);
let store = createStore(reducers);
// 把store导出；
export default store;


import {get} from "./index";
// 该文件只存放了home的请求接口；
export  function getSlider(url){
    return get(url)
}
export function getLesson(category,offset,limit) {
    // 这请求是分批请求；每次只请求5条数据；实现了性能的优化；
    // /getLesson/all?offset=0&limit=5
    return get(`/getLessons/${category}?offset=${offset}&limit=${limit}`);
}



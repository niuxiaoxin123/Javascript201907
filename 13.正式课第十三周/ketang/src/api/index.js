const HOST="http://localhost:3001";
// get 传递一个路由；
export  function get(url) {
    return fetch(HOST+url).then(res=>res.json())
}
export function post(url,param) {
    return fetch(HOST+url,{method:"post",body:param}).then(res=>res.json())
}

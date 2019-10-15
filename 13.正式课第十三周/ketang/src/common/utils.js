export function downUpdate(el,fn) {
    // el: 代表元素  fn ： 代表回调函数
    window.addEventListener("scroll",function () {
        let  scroT = document.documentElement.scrollTop;
        let winH = document.documentElement.clientHeight;
        let scroH = el.scrollHeight;
        //console.log(scroT,winH,scroH);
        if(scroT+winH+20>scroH){
            fn();
        };
    });
}
var uls = document.getElementsByTagName("ul");
var aryUl = utils.toArray(uls);
// 1.请求数据
var data;
var xhr = new XMLHttpRequest();
xhr.open("get","data.txt",false);
xhr.onreadystatechange = function () {
    if(xhr.readyState===4&&/^2\d{2}/.test(xhr.status)){
        data=JSON.parse(xhr.responseText)
    }
}
xhr.send();
// 2. 绑定数据
function bindHtml() {
    for(var i=0;i<50;i++){
        // 产生一个随机数，去获取一个随机的对象，把这个对象中的数据渲染成li;
        var num = Math.round(Math.random()*7);
        var curObj =data[num];
        var curLi = document.createElement("li");
        // 创建一个li下的a标签；
        var a = document.createElement("a");
        a.innerHTML = "采集";
        a.href="javascript:;"
        curLi.appendChild(a);

        var img = document.createElement("img");
        // 把图片的真实路径给了当前图片一个行间属性；
        img.setAttribute("trueImg",curObj.src);
        img.className="bg";
        img.style.height=Math.round(Math.random()*(350-200)+200)+"px";
        curLi.appendChild(img);
        var p = document.createElement("p");
        p.innerHTML = curObj.title;
        curLi.appendChild(p);
        // 根据ul的长度排序，把最新的li放在最短的Ul里面；
        aryUl.sort(function (a,b) {
            return a.scrollHeight-b.scrollHeight;
        });
        aryUl[0].appendChild(curLi);
    }
}
bindHtml();
var index =0;
// 延迟加载
var imgs = document.getElementsByClassName("bg");
function delay() {
    //console.log(index);
    // 循环所有的图片，判断该张图片是否应该加载
    // console.log(imgs.length);
    for(var i=0;i<imgs.length;i++){
        delayImg(i);
    }
}
//可视窗口的高度；
var winH = utils.win("clientHeight");
console.log(winH);
function delayImg(num) {
    var curImg=imgs[num];
    if(curImg.load){
        return;
    }
    // 图片是否加载的临界条件是： 当图片的下边框和浏览器可视窗口的下边框重合时；加载该张图片；
    var curT = utils.offset(curImg).top;// 距离body上边框的距离；
    var curH = curImg.offsetHeight;// 图片的自身高度
    var winT = utils.win("scrollTop");
    if(curT + curH < winH + winT){
        // 获取图片的真实路径地址；
        var trueAddress = curImg.getAttribute("trueImg");// 获取行间属性
        var newImg  = new Image;// 校验路径
        newImg.src = trueAddress;
        newImg.onload = function () {// onload是个事件，当图片真实加载成功会执行函数；如果图片有问题，那么不执行这个函数；
            curImg.src=trueAddress;
            fadeIn(curImg);
            curImg.load=true;
            newImg=null;// 如果这个对象不需要，赋值为null;
            curImg.className="";
        }
    }
}
// 实现渐隐渐现
function fadeIn(curImg) {
    utils.css(curImg,"opacity",0.3);// 设置初始的透明度
    var timer = setInterval(function () {
        var cur = Number(utils.css(curImg,"opacity"));
        cur+=0.1;
        if(cur>=1){
            clearInterval(timer);
        }
        utils.css(curImg,"opacity",cur);
    },100)
}
delay();
// 绑定的是函数的空间地址；
window.onscroll =function () {
    delay();
    var  winT = utils.win("scrollTop");
    var  bodyH = document.body.offsetHeight;
    if(winT + winH + 300>bodyH){
        // 当滚动条卷起的高度+ 一屏的高度+ 300 大于了页面的总高度时，触发重新请求；
        bindHtml();
    }
}





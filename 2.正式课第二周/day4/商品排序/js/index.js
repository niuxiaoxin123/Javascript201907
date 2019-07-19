var data;
var list = document.getElementById("list");
var navs = document.getElementsByTagName("a");
var oLis=document.getElementsByTagName("li");
// 1. 利用ajax请求数据
// 1.创建ajax的实例；
var xhr = new XMLHttpRequest();
// 2.打开一个路径
xhr.open("get","json/product.json",false);
// 3. 监听数据状态
xhr.onreadystatechange = function () {
    // 如果状态是4；并且xhr.status状态码是以2开头的；数据已经请求成功
    if(xhr.readyState===4&&/^2\d{2}/.test(xhr.status)){
        data=JSON.parse(xhr.responseText);
    }
}
// 4.发送请求
xhr.send();
//2.把数据渲染到页面
function bindHtml() {
    var str=``;
    for(var i=0;i<data.length;i++){
        var cur = data[i];
        str+=`<li data-time="${cur.time}" data-hot="${cur.hot}" data-price="${cur.price}">
                    <img src="${cur.img}" alt="">
                    <span>${cur.title}</span>
                    <span>${cur.time}</span>
                    <span>${cur.hot}</span>
                    <span>${cur.price}</span>
               </li>`
    }
    list.innerHTML=str;
}
bindHtml();
//3.给每一个a标签绑定点击事件

for(var i=0;i<navs.length;i++){
    navs[i].index =i;
    navs[i].flag = -1;
    navs[i].onclick = function () {
        // 改变sortList 方法中的this指向；当点击a元素时，把当前a元素传给了sortList;
        // 根据点击传递的index,就知道按照什么排序；
        this.flag*=-1;
        // 通过控制每一个a标签的flag控制是升序还是降序；
        sortList.call(this);
    }
}

function sortList() {
    // this ————> 代表当前点击的a元素
    var ary = utils.toArray(oLis);
    var dataAry = ["data-time","data-hot","data-price"];
    var that = this;
    ary.sort(function (a,b) {
        // a,b : 代表li; li 是一个对象；
        // this --> 当前回调函数中的this；
        var cur = a.getAttribute(dataAry[that.index]);
        var next = b.getAttribute(dataAry[that.index]);
        if(that.index===0){
            cur= cur.replace("-","").replace("-","")
            next= next.replace("-","").replace("-","")
        }
        return (cur-next)*that.flag;
        // return a.innerHTML-b.innerHTML
    });
    // 把排好的DOM数组重新放入list这个元素中
    var frg = document.createDocumentFragment();
    for(var i=0;i<ary.length;i++){
        frg.appendChild(ary[i]);
    }
    list.appendChild(frg);
}
// 按照数据方式；

// 1.先获取元素
var list = document.getElementById("list");
// 2.通过ajax获取数据；
// 前端用来向后端请求数据的；
// 1. 创建一个ajax的实例
var data;
var  xhr = new XMLHttpRequest();
// 2. 打开一个文件路径，读取数据
xhr.open("get","./json/product.json",false);
// 3. 监听当前的数据请求
xhr.onreadystatechange = function () {
    if(xhr.readyState===4&&xhr.status===200){
         data = JSON.parse(xhr.responseText);
    }
}
// 4. 发送请求
xhr.send();
// 3. 绑定数据
function bindHtml() {
    var  str = ``;
    for(var i=0;i<data.length;i++){
        var cur = data[i];
        str+=`<li data-time="${cur.time}" data-hot="${cur.hot}" data-price="${cur.price}">
                <img src=${cur.img}>
                <span>${cur.title}</span>
                <span>${cur.hot}</span>
                <span>${cur.time}</span>
                <span>${cur.price}</span>
            </li>`
    }
    list.innerHTML = str;
}
bindHtml();

//4. 给每一个a标签绑定点击事件
var navs = document.getElementsByTagName("a");
for(var i=0;i<navs.length;i++){
    navs[i].index =i;
    // 初始化每一个a都有一个-1；
    navs[i].flag=-1;// 1  cur-next    -1  :next-cur    1:cur-next
    navs[i].onclick = function () {
        this.flag*=-1;
        sortList.call(this);
    }
}
// 5. 用来对DOM元素进行排序
var oLis = document.getElementsByTagName("li");
function sortList() {
    //this -->
    console.log(this.index);
    // 用that 临时存储this；
    var  that = this;
    var ary = utils.toArray(oLis);
    var  newArr = ["data-time","data-hot","data-price"];
    ary.sort(function (a,b) {
        // a:li<li></li>
        //console.log(a);
        //console.log(a.getAttribute("data-time"));
        var  cur = a.getAttribute(newArr[that.index]);
        var  next = b.getAttribute(newArr[that.index]);
        if(that.index===0){
            // 如果当前点击的是时间，那么需要去掉获取值中的"-";
            cur = cur.replace("-","").replace("-","");
            next = next.replace("-","").replace("-","");
        }
        return (cur-next)*that.flag;
    });
    var frg = document.createDocumentFragment();
    for(var i=0;i<ary.length;i++){
        frg.appendChild(ary[i]);
    }
    list.appendChild(frg);
}





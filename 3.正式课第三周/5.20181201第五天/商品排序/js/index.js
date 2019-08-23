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
/*[{time:"2014-1-1"},{time:"2013-1-1"},{time:"2017-1-1"}]
[{time:"2013-1-1"},{time:"2014-1-1"},{time:"2017-1-1"}]*/
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
    navs[i].index = i;
    // 初始化每一个a都有一个-1；
    navs[i].flag=-1;// 1  cur-next    -1  :next-cur    1:cur-next
    navs[i].onclick = function () {
        this.flag*=-1;
        sortList.call(this);
        addArrow.call(this);// this --> 点击的a标签
        removeArrow.call(this);
    }
}
// 5. 用来对DOM元素进行排序
var oLis = document.getElementsByTagName("li");
function sortList() {
    //this -->
    //console.log(this.index);
    //用that 临时存储this；
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
//6.点击给当前的a添上类名bg;
function addArrow() {
   var  up = this.children[0];
   var  down = this.children[1];
   if(this.flag>0){
       up.classList.add("bg");
       down.classList.remove("bg")
   }else{
       down.classList.add("bg");
       up.classList.remove("bg");
   }
}
function removeArrow() {
    for(var i=0;i<navs.length;i++){
        if(this!==navs[i]){
            navs[i].children[0].classList.remove("bg");
            navs[i].children[1].classList.remove("bg");
            navs[i].flag=-1;//对其他a标签的flag进行初始化，初始化为-1；初始化初始的状态，不管之前是什么状态；
        }
    }
}

// 1. 通过ajax获取数据  1--2--3--4;
// 2. 对数据循环进行绑定；
// 3. 循环a元素绑定事件
// 4. 实现真正的DOM排序
     // 1) : 类数组转数组
     // 2) : 数组通过sort对元素进行排序
     // 3) : 循环重新放入list中；
// 5.新增bg
// 6.删除bg






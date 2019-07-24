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
        img.style.height=Math.round(Math.random()*(350-200)+200)+"px";
        curLi.appendChild(img);
        var p = document.createElement("p");
        p.innerHTML = curObj.title;
        curLi.appendChild(p);
        aryUl.sort(function (a,b) {
            return a.scrollHeight-b.scrollHeight;
        });
        aryUl[0].appendChild(curLi);
    }
}
bindHtml();



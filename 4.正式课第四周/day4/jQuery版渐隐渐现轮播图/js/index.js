// 渐隐渐现的轮播图原理：五张图片重叠放置，让其中的透明度从0逐渐变成1；再让其正在显示的这张从1变成0;[fadeIn\fadeOut];
// 1. 请求数据
// 2. 循环绑定数据，添加到页面中
// 3. 实现懒加载
// 4. 实现自动轮播
// 5. 实现鼠标滑入滑出
// 6. 实现焦点跟随；
// 7. 实现点击焦点切换图片
// 8. 实现点击左右按钮
let $imgLength;// 是一个jQuery 的变量
// jquery获取的元素不存在映射的机制；
let timer;
let $oLis;
// console.log($imgLength);
// 1. 请求数据
let send=()=> {
    $.ajax({
        type: "get",// 请求方式
        url: "data.json",// 路径地址
        async: true,//同步异步；false 是同步，true是异步的；
        success: (data) => {// 当请求成功之后，执行的回调函数；并且把请求回来的数据传给当前的回调函数； 自动变成JSON格式的对象
            //console.log(data);
            bindHtml(data);
        }
    });
}

//2.数据绑定
let bindHtml =(data)=>{
    let imgStr = ``;
    let liStr=``;
    // $.each : 循环数据；（data,callBack）;回调函数中的第一个参数是数据的索引；
    $.each(data,(index)=>{
        imgStr+=`<img data-src="${data[index].img}">`;
        liStr+=`<li></li>`
    });
    // 放到页面中
    $("#swiper").html(imgStr);
    $("#focus").html(liStr);
    //给第一个li添加类名select;
    $oLis=$("#focus li");
    $oLis.eq(0).addClass("select");
    liBind();
    delayImg();
    $imgLength=$("img").length;
    timer = setInterval(autoMove,2000)
}
// 3.实现延迟加载
let delayImg =()=>{
    $("img").each(function(index,item){
        //console.log(this);// 代表每一张图片
        // 有记账图片就会执行多少次
        // console.log(item===this);
        let trueAddress = $(this).attr("data-src");
        let that = this;
        let newImg = new Image;
        newImg.src = trueAddress;
        $(newImg).load(function () {
            that.src=trueAddress;// 把路径地址给了真实的DOM；
            //$(that).attr("src",trueAddress)
            index===0?$(that).fadeIn():null;// 让第一张透明度逐渐变成1;
            newImg=null;
        })
    })
};
// 4.实现自动切换
let  step = 0;
let autoMove =(n)=>{
    console.log(n);
    step++;
    // 如果传递值了，那么把传递的n赋值给step；否则什么也不做；
    typeof n!=="undefined"?step=n:null;
     //当step===img.length;让step立即值为0；那么这次显示的是第一张；
    step===$imgLength?step=0:null;
    $("img").eq(step).fadeIn().siblings().fadeOut();
    changeTip(step);
    //console.log(step);
    // 让当前图片透明度逐渐为1，其他的逐渐为0；
    //console.log(step,200);
    /*console.log(200);
    $("img").eq(step).fadeIn(2000,function () {
        //console.log(step,100);
        console.log(100);
        $(this).fadeOut(2000);
    })
    step++;*/
}
// 5.实现焦点跟随
let  changeTip =(n)=>{
    $("#focus li").eq(n).addClass("select").siblings().removeClass("select");
}

// 6. 鼠标滑上滑出
$("#outer").hover(function () {
    clearInterval(timer)
},function () {
   timer=setInterval(autoMove,2000)
});

// 7.鼠标划上li，切换对应的图片
let liBind = ()=>{
    $oLis.hover(function () {
        //console.log(100);
        //把当前li的索引传给autoMove
        autoMove($(this).index());
    })
}
// 8.左右按钮绑定点击事件
$("#right").click(function () {// 点击向右，执行autoMove方法；
    autoMove();
})
$("#left").click(function () {
    step-=2;
    // 当图片在第一张时，step值是0；那么重置step值是3；在autoMove中step直接++之后是4，代表最后一张；所以加之前是3；
    step===-2?step=3:null;
    autoMove();
})
send();



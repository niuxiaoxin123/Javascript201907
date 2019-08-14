// 获取所有的元素
let $main = $(".main"),
    $header = $(".header"),
    $footer = $(".footer"),
    $wrap=$(".wrap"),
    $musicBtn=$("#musicBtn"),
    $music=$("#music"),
    timer=null;
// 1.由于各个屏幕的高度不同，所以应该根据屏幕的高度来设置main的高度；
// 用屏幕的总高度减去header的高度和footer的高度；
function computedMain() {
    let winH = document.documentElement.clientHeight;
    let headerH = $header[0].offsetHeight;
    let footerH = $footer[0].offsetHeight;
    let val = parseFloat(document.documentElement.style.fontSize);
    let mainH = (winH-headerH-footerH)/val-0.5+"rem";
    $main.css("height",mainH);
}
computedMain()
window.addEventListener("resize",computedMain);

//2.数据请求
$.ajax({
    url:"json/lyric.json",
    type:"get",
    async:false,
    success:function (data) {
        console.log(data);
        bindHtml(data.lyric);
    }
})
// 3.数据绑定
function bindHtml(data) {
    data=data.replace(/&#(\d+);/g,function (res,a) {
        // res : 整个正则捕获到的内容，a代表小正则捕获的内容
        switch(parseFloat(a)){
            case 32:
               return " ";
            case 40:
                return "(";
            case 41:
                return ")";
            case 45:
                return "-"
        }
        return res;
    })
    let ary = [];// 用来储存分钟秒和歌词的；
    // 得到分钟秒和歌词
    data.replace(/\[(\d+)&#58;(\d+)&#46;(\d+)\]([^&#]+)(?:(&#10;))?/g,function (res,min,sec,a,val) {
        // arguments : 类数组集合；实参的集合
        ary.push({
            min:min,
            sec:sec,
            val:val
        })
    });
    // 循环ary，进行数据拼接;将分钟和秒放在行间属性上；
    let str=``;
    for(let i=0;i<ary.length;i++){
        str+= `<p data-min="${ary[i].min}" data-sec="${ary[i].sec}">${ary[i].val}</p>`
    }
    $wrap.html(str);
    $musicBtn.addClass("select");
    // 谷歌的新版本浏览器，不允许直接自动播放audio音频；
    $music[0].addEventListener("canplay",function () {
        $music[0].play();
        $("#right").html(formate($music[0].duration))
        timer=setInterval(computedTime,1000);
    });
}
// 点击音乐按钮实现播放暂停切换
$musicBtn.tap(function () {
    if($music[0].paused){
        $musicBtn.addClass("select");
        $music[0].play();
        timer=setInterval(computedTime,1000);
        return;
    }
    $musicBtn.removeClass("select");
    $music[0].pause();
    clearInterval(timer);
});

// 格式化时间
function formate(time) {
    let min = Math.floor(time/60);
    let sec = Math.floor(time-min*60);
    min=min<10?"0"+min:min;
    sec=sec<10?"0"+sec:sec;
    return min+":"+sec;
}
let curT= 0;
let flag = 0;
// 计算当前的时间以及进度条；
function computedTime() {
    let current = $music[0].currentTime;
    let duration = $music[0].duration;
    if(current>=duration){
        // 如果音乐播放结束，清除定时器，并且清除动画；
        clearInterval(timer);
        $musicBtn.removeClass("select");
        return;
    }
    let str = formate(current);
    $("#left").html(str);
    // 时间的比等于走过的路程比；
    $(".lineBg").css("width",current/duration*100+"%");
    let ary = str.split(":")
    let min = ary[0];
    let sec = ary[1];
    let allP = document.getElementsByTagName("p");
    for(let i=0;i<allP.length;i++){
        let curP = allP[i];
        let dataMin = curP.getAttribute("data-min");
        let dataSec = curP.getAttribute("data-sec");
        if(min===dataMin&&sec===dataSec){
            flag++;
            $(curP).addClass("select").siblings().removeClass("select");
            if(flag>=6){
                curT-=0.84;
                $wrap.css("top",curT+"rem");
            }
        }
    }
}






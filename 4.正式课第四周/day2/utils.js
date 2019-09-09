// 高级单例模式

var utils = (function () {
    function offset(curEle) {
        var l = curEle.offsetLeft;
        var t = curEle.offsetTop;
        var parent = curEle.offsetParent;
        while(parent!==document.body){
            l+=parent.offsetLeft+parent.clientLeft;
            t+=parent.offsetTop+parent.clientTop;
            parent = parent.offsetParent;
        }
        return {l,t}
    }
    function getCss(curEle,attr) {
        var val;
        if("getComputedStyle" in window){
            val=getComputedStyle(curEle)[attr]
        }else{
            val=curEle.currentStyle[attr]
        }
        var reg =/^(width|height|left|top|bottom|right|margin|padding|fontSize|opacity)$/;//
        if(reg.test(attr)){
            val=parseFloat(val);
        }
        return val;
    }
    function setCss(curEle,attr,val) {
        var reg =/^(width|height|left|top|bottom|right|margin|padding|fontSize)$/;
        if(reg.test(attr)){
            if(typeof val==="number"){
                val =val+"px";
            }
        }
        curEle.style[attr]=val;
    }
    function setGroupCss(curEle,obj) {
        for(var key in obj){
            setCss(curEle,key,obj[key])
        }
    }
    function css(...arg) {
        if(arg.length===2){
            if(typeof arg[1]==="string"){
                return getCss(...arg)
            }else{
                setGroupCss(...arg)
            }
        }else if(arg.length===3){
            setCss(...arg)
        }
    }
    function win(attr,val) {
        if(typeof val==="undefined"){
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr]=val;
        document.body[attr]=val;
    }
    function toArray(likeAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry);
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                ary[i] = likeAry[i];
            }
        }
        return ary;
    }
    return {
        offset,// offset这个函数的空间地址；
        getCss,
        setCss,
        setGroupCss,
        css,
        win,
        toArray
    }
})();

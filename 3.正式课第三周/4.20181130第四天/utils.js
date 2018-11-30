/*// 单例模式
var num = 100;

var utils = {
    toArray:function (likeAry) {
        var ary = [];
        try{
            ary = Array.prototype.slice.call(likeAry)
        }catch (e){
            for(var i=0;i<likeAry.length;i++){
                var  cur = likeAry[i];
                ary.push(cur);
            }
        }
        return ary;
    }
}*/
// 高级单例模式
var utils = (function () {
    function toArray(likeAry) {
        var ary = [];
        try{
            ary = Array.prototype.slice.call(likeAry)
        }catch (e){
            for(var i=0;i<likeAry.length;i++){
                var  cur = likeAry[i];
                ary.push(cur);
            }
        }
        return ary;
    }
    return {
        toArray:toArray
    }
})()

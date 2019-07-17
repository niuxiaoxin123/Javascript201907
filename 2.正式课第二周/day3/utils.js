// 有一个js专门存储一些公共的方法；
// 单例模式，避免全局变量的干扰；
/*var utils = {
    toArray: function (likeAry) {
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
}*/

var utils = (function () {
    var  num =1;
    return {
        toArray: function (likeAry) {
            var ary = [];
            try {
                ary = Array.prototype.slice.call(likeAry);
            } catch (e) {
                for (var i = 0; i < likeAry.length; i++) {
                    ary[i] = likeAry[i];
                }
            }
            return ary;
        },
        toJSON:function () {

        }

    }
})()

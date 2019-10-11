/**
 * @file 百度统计注入js代码
 * @author v_wangyaping@baidu.com
 * 2018/9/17
 */
export const bdTj = (pageUrl, cb) => {
    let _hmt = window._hmt || [];
    (function () {
        let hm = document.createElement('script');
        hm.src = 'https://hm.baidu.com/hm.js?54639110b36d3ad14625acf4589e9217';
        let s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(hm, s);
        _hmt.push(['_setAutoPageview', false]);
        !!cb && cb();
    })();
};

// 百度商桥接入代码
export const bdQiao = () => {
    var _hmt = _hmt || [];
    (function () {
        var hm = document.createElement('script');
        hm.src = 'https://hm.baidu.com/hm.js?39d409bea67c6841aa6215ff37b8ea48';     // 线上环境
        // hm.src = 'https://hm.baidu.com/hm.js?7e4a58fcdcb7d1763cd9f006a2746984';     // 玉龙环境
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(hm, s);
    })();
};
/**
 * 百度事件分析 -- 调用次数没有限制
 * @param {Array} trackData
 * 官方示例代码：
 * 用法：_hmt.push([‘_trackEvent’, category, action, opt_label,opt_value]);
 * 示例：_hmt.push([‘_trackEvent’, ‘video’, ‘play’, ‘Hey Jude’]);
 * 名称          必选/可选	     类型	          功能
 * category	    必选	        String	        要监控的目标的类型名称，通常是同一组目标的名字，比如”视频”、”音乐”、”软件”、”游戏”等等
 * action	    必选	        String	        用户跟网页进行交互的动作名称，如”播放”、”暂停”、”下载”等等
 * opt_label	可选	        String	        事件的一些额外信息，通常可以是歌曲的名称、软件的名称、链接的名称等等
 * opt_value	可选	        Number	        跟事件相关的数值，比如权重、时长、价格等等，在报表中可以看到其平均值等数据
 */

export const bdTrackEvent = label => {
    label = label ? 'creditcard_' + label : 'init';
    let _hmt = window._hmt || [];
    let trackData = [
        '_trackEvent',
        'button',
        'click',
        label,
        0
    ];
    _hmt.push(trackData);
    console.log('事件分析统计', label);
};
// 页面pv统计 -- 测试代码 -- 如果数据准确则转为正式代码
export const bdTrackPageView = pageURL => {
    let _hmt = window._hmt || [];
    _hmt.push(['_trackPageview', pageURL]);
    console.log('页面统计', pageURL);
};
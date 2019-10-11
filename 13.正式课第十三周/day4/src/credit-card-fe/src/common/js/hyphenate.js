/**
 * @file hyphenate
 * @author sunxiaoxu01
 */
import consts from '../constant/const';
import forge from 'node-forge';

export default {
    propRE: /[\{|,][\s|"]*([a-zA-Z|_])+[\s|"]*(?=:)/g,
    camelCaseRE: /_([a-z])/g,
    kebabCaseRE: /([^_])([A-Z])/g,
    toCamelCaseJSON(json) {
        const self = this;
        return json.replace(self.propRE, function ($0) {
            return self.toCamelCase($0);
        });
    },
    toKebabCaseJSON(json) {
        const self = this;
        return json.replace(self.propRE, function ($0, $1) {
            return self.toKebabCase($0);
        });
    },
    toCamelCase(str) {
        const self = this;
        return str ? str.replace(self.camelCaseRE, function ($0, $1) {
            return $1.toUpperCase();
        }) : str;
    },
    toKebabCase(str) {
        const self = this;
        return str ? str.replace(self.kebabCaseRE, '$1_$2').toLowerCase() : str;
    },
    encodeData(data) {
        if (!data) {
            return '';
        }
        let pairs = [];
        for (let name in data) {
            if (!data.hasOwnProperty(name)) {
                continue;
            }
            if (typeof data[name] === 'function') {
                continue;
            }
            if (data[name] !== undefined) {
                let value = '';
                if (Array.isArray(data[name])) {
                    value = JSON.stringify(data[name]);
                } else {
                    value = data[name].toString();
                }
                name = encodeURIComponent(name.replace('%20', '+'));
                value = encodeURIComponent(value.replace('%20', '+'));
                pairs.push(name + '=' + value);
            }

        }
        return pairs.join('&');
    },
    getSearchString(initObj) {
        let str = '';
        if (initObj) {
            str = initObj.initStr || '';
            if (str.indexOf('?') !== -1) {
                str = str.split('?')[1];
            }
        } else {
            str = location.search.replace('?', '');
        }
        let obj = {};

        if (str) {
            let arr = str.split('&');

            arr.forEach((item, index) => {
                let tmpArr = item.split('=');
                obj[decodeURIComponent(tmpArr[0])] = decodeURIComponent(tmpArr[1]);
            });
        }
        return obj;
    },
    setSearchString(data) {
        let params = this.encodeData(data);
        let href = location.href;
        // 无刷新修改页面 url
        if (params) {
            if (/\?/.test(href)) {
                href = href.replace(/\?.*/, '?' + params);
            } else {
                href += '?' + params;
            }
        }

        // 替换当前历史纪录
        history.replaceState(null, null, href);
    },
    // 获取小写的最后一级前端路由 格式：tellist
    getLowerRoute() {
        let query = location.pathname.split('/');
        let lowerroute = (query[query.length - 1] || '/').toLowerCase();
        return lowerroute;
    },
    // 以key=value的形式用&符号组装起来 格式:&a=1&b=1
    packagePams(pamsObj) {
        let packagedPams = '';
        let searchObj = this.getSearchString();
        searchObj.path && (searchObj.path = this.ctPath());
        let validKey = consts.validKeys;
        for (let key in searchObj) {
            if (validKey.indexOf(key) !== -1) {
                pamsObj[key] = searchObj[key];
            }
        }
        for (let k in pamsObj) {
            packagedPams += '&' + k + '=' + pamsObj[k];
        }
        return packagedPams;
    },
    // 将url中的path值与小写路由用下划线组装起来 格式：homehotbank_personalcenter_tellist
    ctPath() {
        let lower = this.getLowerRoute();
        let searchObj = this.getSearchString();
        if (lower === '/' || lower === 'bkrcredit') {
            lower = 'home';
        }
        searchObj.path && (searchObj.path = searchObj.path + '_' + lower);
        !searchObj.path && (searchObj.path = lower);
        return searchObj.path || '';
    },
    // url某些参数逐级携带
    concatChnQuery(str = '', params = '') {
        let oldStr = str;

        // console.log(str, 132)
        let path = str.split('?')[0];
        let search = str.split('?')[1];
        let strObj = this.getSearchString({initStr: search});
        let paramsObj = this.getSearchString({initStr: params});
        let totalObj = {
            ...strObj,
            ...paramsObj
        };
        let totalParams = this.packagePams(totalObj);
        totalParams && (str = (path + '?' + totalParams).replace('?&', '?'));
        !totalParams && (str = path);

        // 如果跳转的链接是外部链接，就把携带的参数拦截掉
        let urlReg = /^http(s)?:\/\/xinyongka\.baidu\.com/;
        let reg = /^http/;

        if (!urlReg.test(str) && reg.test(str)) {
            return oldStr;
        }
        return str;
    },
    encodeParams() {
        let pams = '';
        pams = this.linkPams(pams);
        pams = ('?' + pams).replace('?&', '?');
        return encodeURIComponent(pams);
    },
    linkPams(pams) {
        let searchObj = this.getSearchString();
        searchObj.requestFrom && (pams += ('&requestFrom=' + searchObj.requestFrom));
        searchObj.tid && (pams += ('&tid=' + searchObj.tid));
        searchObj.zs && (pams += ('&zs=' + searchObj.zs));
        searchObj.gf && (pams += ('&gf=' + searchObj.gf));
        return pams;
    },
    getTime() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        let time = ''
            + year
            + (month < 9 ? '0' + (month + 1) : month + 1)
            + (day < 10 ? '0' + day : day)
            + (hour < 10 ? '0' + hour : hour)
            + (minute < 10 ? '0' + minute : minute)
            + (second < 10 ? '0' + second : second);
        return time;
    },
    // 设置document的title标题
    setDocumentTitle(title) {
        document.title = title;
        // hack在微信等webview中无法修改document.title的情况
        let iframe = document.createElement('iframe');
        iframe.style.visibility = 'hidden';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.onload = function () {
            setTimeout(function () {
                document.body.removeChild(iframe);
            }, 0);
        };
        document.body.appendChild(iframe);
    },
    // 获取cookie值  name为要获取的key值，返回对应的value
    getCookie(name) {
        let strcookie = document.cookie; // 获取cookie字符串
        let arrcookie = strcookie.split('; '); // 分割
        // 遍历匹配
        for (let i = 0; i < arrcookie.length; i++) {
            let arr = arrcookie[i].split('=');
            if (arr[0] === name) {
                return arr[1];
            }
        }
        return '';
    },
    // md5加密 -32位小写
    md5(value) {
        let md = forge.md.md5.create();
        let m = md.update(value);
        let k = m.digest().toHex();
        return k;
    }
};

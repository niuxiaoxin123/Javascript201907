/**
 * @file 加密代码
 * @author xiangjian@baidu.com
 * 2018/11/7
 */

import forge from 'node-forge';
import CryptoJS from 'crypto-js';
let initBaiduid = '0A1AE7CDF25DA0894A3C27BCFBDE81B0:FG=1';

// 加密
export function aesEncrypt(rsakey = '', encryptData) {
    encryptData = CryptoJS.enc.Utf8.parse(JSON.stringify(encryptData));
    let str = getCookie('BAIDUID') || initBaiduid;
    str = str.split(':')[0];
    let key = str.slice(0, 16);
    rsakey = forge.random.getBytesSync(16);
    let iv = str.substring(str.length - 16);
    key = CryptoJS.enc.Utf8.parse(key);
    iv = CryptoJS.enc.Utf8.parse(iv);
    let encrypted = CryptoJS.AES.encrypt(encryptData, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC
    });
    let result = btoa(encrypted.toString());
    let data = {
        content: result,
        key: rsakey
    };

    return data;

}

function getCookie(name) {
    let arr;
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    }
    else {
        return null;
    }
}

// 解密
export function aesDecrypt(resultData) {
    let descypyData = forge.util.decode64(resultData);
    let str = getCookie('BAIDUID') || initBaiduid;
    str = str.split(':')[0];
    let key = str.slice(0, 16);
    let iv = str.substring(str.length - 16);
    key = CryptoJS.enc.Utf8.parse(key);
    iv = CryptoJS.enc.Utf8.parse(iv);
    let decrypted = CryptoJS.AES.decrypt(descypyData, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC
    });

    let result = decrypted.toString(CryptoJS.enc.Utf8);

    return result;
}



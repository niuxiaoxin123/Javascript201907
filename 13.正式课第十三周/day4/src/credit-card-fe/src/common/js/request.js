/**
 * @file request
 * @author sunxiaoxu01
 */

import hyphenate from './hyphenate';
import fetch from 'isomorphic-fetch';
import urlencode from './urlencode';
import {error} from '../../pages/components/tip';
import {aesEncrypt, aesDecrypt} from './cpyer';

function checkStatus(response) {
    if (response.ok) {
        return response;
    }

    const error = new Error();

    error.response = response;
    throw error;
}

export default async function request(url, options, unhyphenate = true, type = 'JSON', noerror = false) {
    let queryObj = hyphenate.getSearchString();

    options = options || {};

    if (!options.notNeedAddUrlParams) {
        options.body = options.body ? Object.assign(queryObj, options.body) : queryObj;
    }

    if (options.body) {
        let body = unhyphenate
            ? JSON.stringify(options.body)
            : hyphenate.toKebabCaseJSON(JSON.stringify(options.body));
        options.method = options.method
            ? options.method
            : 'GET';
        body = JSON.parse(body);
        // url的path参数接口不传递
        body.path && delete body.path;
        if (options.method.match(/^get$/gi)) {
            if (options.encAndDec) { // 需要加密
                url += (/\?/.test(url) ? '&' : '?') + hyphenate.encodeData(aesEncrypt('', body));
            } else {
                url += (/\?/.test(url) ? '&' : '?') + hyphenate.encodeData(body);
            }
            delete options.body;
        } else {
            options.body = urlencode(body);
        }
    }

    !options.credentials && (options.credentials = 'include');

    options.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    try {
        const response = await fetch(url, options);

        checkStatus(response);

        let data;
        let responseData = {};
        let headers = {};
        let body = {};
        if (type === 'JSON') {
            responseData = await response.json();
            if (responseData
                && responseData.hasOwnProperty('ret')
                && responseData.ret === 102) {
                let href = responseData.content
                    || 'https://wappass.baidu.com/passport/?login&tpl=bkr&u=';
                href += encodeURIComponent(location.href);
                location.href = href;
                return;
            } else if (!responseData
                || !responseData.hasOwnProperty('ret')
                || (!!responseData.ret && ('' + responseData.ret).toLowerCase() !== 'success')) {
                let msg = responseData.msg || '服务器错误';
                let ret = responseData.ret || 'fail';
                responseData = {
                    ret: ret,
                    msg: msg
                };
                !noerror && error(responseData.msg);
            }
        } else if (type === 'text') {
            data = await response.text();
            responseData = data;
        } else if (type === 'blob') {
            data = await response.blob();
            responseData = data;
            headers = await response.headers;
            body = await response.body;
        }

        const ret = {
            data: responseData,
            headers: headers,
            body: body
        };

        if (response.headers.get('x-total-count')) {
            ret.headers['x-total-count'] = response
                .headers
                .get('x-total-count');
        }
        if (options.encAndDec) { // 需要解密
            ret.data.content = JSON.parse(aesDecrypt(ret.data.content.content));
}
return ret;


} catch (e) {
    if (noerror) {
        return;
    }
}
}

/**
 * @file application/x-www-form-urlencoded
 */

function dfsQuery(key, value, item, query) {
    let type = typeof value;
    if (type === 'string') {
        item += '=' + encodeURIComponent(value);
        query.push(item);
        return;
    }
    if (type === 'number' || type === 'boolean') {
        item += '=' + value;
        query.push(item);
        return;
    }
    if (type === 'object') {
        Object.keys(value).forEach(k => {
            dfsQuery(k, value[k], item + '[' + k + ']', query);
        });
        return;
    }
    if (type === 'array') {
        value.forEach((v, i) => {
            dfsQuery(i, v, item + '[' + i + ']', query);
        });
    }
}

export default function urlencode(obj) {
    let query = [];

    Object.keys(obj).forEach(key => {
        dfsQuery(key, obj[key], key, query);
    });

    return query.join('&');
}

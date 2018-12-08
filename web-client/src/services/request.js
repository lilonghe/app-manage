import qs from 'qs';
import 'whatwg-fetch';
import { message } from 'antd';
let host = 'http://47.101.42.102/api/';
if (process.env.NODE_ENV=='development') {
    host = 'http://localhost:7001/';
}

const request = async (url, options={ query:{}, method:'GET' }) => {
    options.method = options.method.toUpperCase();
    const q = qs.stringify(options.query);

    if (q !== "") {
        url = `${url}?${q}`;
    }

    if (url.indexOf('http') != 0) {
        url = host + url;
    }

    return fetch(url, {
        ...options,
        "credentials": "include",
        "headers": {
            ...options.headers,
            "Content-Type": "application/json; charset=utf-8"
        }
    }).
        then((response) => response.json().then((data) => {
            if (data.error_code) {
                global.actionTip.fail(`[${data.error_code}] ${data.error_message}`)
                return { err: data.error_message, data };
            }
            return { data };
        })).
        catch((err) => {
            global.actionTip.fail(err.message)
            return { err: err };
        });
};

export default request;

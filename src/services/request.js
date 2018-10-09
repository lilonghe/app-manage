import qs from 'qs';
import 'whatwg-fetch';
import { message } from 'antd';
const host = 'http://localhost:3000/';

const request = async (url, options) => {
    if (!options) {
        options = {
            "query": {},
            "method": "GET"
        };
    }

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
            if (data.errcode != 0) {
                message.error(`[${data.errcode}] ${data.errmsg}`)
                return { err: data.errmsg, data };
            }
            return { data: data.data };
        })).
        catch((err) => {
            return { err: err };
        });
};

export default request;

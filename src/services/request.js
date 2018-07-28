import qs from 'qs';
import 'whatwg-fetch';
const host = 'http://rap2api.taobao.org/app/mock/24484/';

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
            return { data: data.data };
        })).
        catch((err) => {
            return { err: err };
        });
};

export default request;

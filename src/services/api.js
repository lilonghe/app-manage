import request from './request';

export function fetchApps() {
    return request('apps');
}

export function fetchApp(appid) {
    return request(`apps/${appid}`);
}

export function fetchAppRoles(appid) {
    return request(`apps/${appid}/roles`);
}

export function addApp(data) {
    return request(`app`, { method: 'post', body: JSON.stringify(data)})
}
import request from './request';

export function fetchApps() {
    return request('apps');
}

export function fetchApp(appid) {
    return request(`apps/${appid}`);
}

export function addApp(data) {
    return request(`app`, { method: 'post', body: JSON.stringify(data)})
}

export function fetchAppRoles(appid) {
    return request(`roles/${appid}`);
}

export function getAppPermissions(appid) {
    return request(`permissions/${appid}`);
}

export function addAppPermission(data) {
    return request(`permission`, {method: 'post', body: JSON.stringify(data)});
}

export function editAppPermission(data) {
    return request(`permission`, {method: 'patch', body: JSON.stringify(data)});
}

export function addAppRole(data) {
    return request(`role`, {method: 'post', body: JSON.stringify(data)});
}

export function editAppRole(data) {
    return request(`role`, {method: 'patch', body: JSON.stringify(data)});
}

export function editAppRolePermission(data) {
    return request(`role/${data.roleId}/permission`, {method: 'patch', body: JSON.stringify(data)});
}

export function editAppInfo(data) {
    return request(`app`, {method: 'patch', body: JSON.stringify(data)});
}
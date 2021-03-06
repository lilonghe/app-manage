import request from './request';

export function fetchApps() {
    return request('apps');
}

export function fetchApp(appid) {
    return request(`apps/${appid}`);
}

export function addApp(data) {
    return request(`apps`, { method: 'post', body: JSON.stringify(data)})
}

export function fetchAppRoles(appid) {
    return request(`roles?appid=${appid}&with_permission=true`);
}

export function getAppPermissions(appid) {
    return request(`permissions?appid=${appid}`);
}

export function addAppPermission(data) {
    return request(`permissions`, {method: 'post', body: JSON.stringify(data)});
}

export function editAppPermission(data) {
    return request(`permissions`, {method: 'put', body: JSON.stringify(data)});
}

export function addAppRole(data) {
    return request(`roles`, {method: 'post', body: JSON.stringify(data)});
}

export function editAppRole(data) {
    return request(`roles`, {method: 'put', body: JSON.stringify(data)});
}

export function editAppRolePermission(data) {
    return request(`roles/permissions`, {method: 'put', body: JSON.stringify(data)});
}

export function editAppInfo(data) {
    return request(`apps`, {method: 'put', body: JSON.stringify(data)});
}

export function searchUser(data) {
    return request(`users`,{ method: 'get', query: data });
}

export function addUser(data) {
    return request(`users`, {method: 'post', body: JSON.stringify(data)});
}

export function editUser(data) {
    return request(`users`, {method: 'put', body: JSON.stringify(data)});
}

export function userAddRole(data) {
    return request(`users/roles`, {method: 'post', body: JSON.stringify(data)});
}

export function userRemoveRole(data) {
    return request(`users/roles`, {method: 'delete', body: JSON.stringify(data)});
}

export function getUserAppRoleIds(data) {
    return request(`users/roles`, {method: 'get', query: data});
}

export function getAppLogs() {
    return request(`logs/apps`, {method: 'get'});
}

export function getUserLogs() {
    return request(`logs/users`, {method: 'get'});
}

export function removeAppPermission(data) {
    return request(`permissions`, {method: 'delete', body: JSON.stringify(data)});
}

export function removeAppRole(data) {
    return request(`roles`, {method: 'delete', body: JSON.stringify(data)});
}
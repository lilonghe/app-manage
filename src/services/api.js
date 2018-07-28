import request from './request';

export function fetchApps() {
    return request('apps');
}

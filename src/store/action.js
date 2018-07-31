import { fetchApps, fetchApp } from '../services/api';

export const fetchAppsAction = () => {
    return async dispatch => {
        let { err, data } = await fetchApps();
        if (!err) {
            dispatch({
                type: 'onFetchApps',
                value: data
            });
        }
    };
}

export const fetchAppAction = (appid) => {
    return async dispatch => {
        let { err, data } = await fetchApp(appid);
        if (!err) {
            dispatch({
                type: 'onFetchApp',
                value: data
            });
        }
    };
}


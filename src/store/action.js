import { fetchApps, fetchApp, fetchAppRoles} from '../services/api';
import actionTypes from './actionTypes';

export const fetchAppsAction = () => {
    return async dispatch => {
        let { err, data } = await fetchApps();
        if (!err) {
            dispatch({
                type: actionTypes.onFetchApps,
                value: data
            });
        }
    };
};

export const fetchAppAction = (appid) => {
    return async dispatch => {
        let { err, data } = await fetchApp(appid);
        if (!err) {
            dispatch({
                type: actionTypes.onFetchApp,
                value: data
            });
        }
    };
};

export const fetchAppRolesAction = (appid) => {
    return async dispatch => {
        let { err, data } = await fetchAppRoles(appid);
        if (!err) {
            dispatch({
                type: actionTypes.onFetchAppRoles,
                value: data
            });
        }
    };
};
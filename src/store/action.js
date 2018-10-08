import { fetchApps, fetchApp, fetchAppRoles, addApp,getAppPermissions} from '../services/api';
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

export const addAppAction = (cb) => {
    return async dispatch => {
        let { err, data } = await addApp();
        if (!err) {
            cb && cb();
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

export const fetchAppPermissionAction = (appid) => {
    return async dispatch => {
        let { err, data } = await getAppPermissions(appid);
        if (!err) {
            dispatch({
                type: actionTypes.onFetchAppPermission,
                value: data
            });
        }
    };
};

export const chooseAppAction = (appid) => {
    return async dispatch => {
        dispatch({
            type: actionTypes.onChooseApp,
            value: appid
        });
    }
}
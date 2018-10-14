import { fetchApps, fetchApp, fetchAppRoles, addApp, getAppPermissions, addAppPermission, addAppRole, editAppRole, editAppRolePermission} from '../services/api';
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

export const addAppAction = (params, cb) => {
    return async dispatch => {
        let { err, data } = await addApp(params);
        if (!err) {
            cb && cb(data);
        }
    };
};

export const addAppPermissionAction = (params, cb) => {
    return async dispatch => {
        let { err, data } = await addAppPermission(params);
        if (!err) {
            cb && cb({ err, data });
        }
    };
}

export const addAppRoleAction = (params, cb) => {
    return async dispatch => {
        let { err, data } = await addAppRole(params);
        if (!err) {
            cb && cb({ err, data });
        }
    };
}

export const editAppRoleAction = (params, cb) => {
    return async dispatch => {
        let { err, data } = await editAppRole(params);
        if (!err) {
            cb && cb({ err, data });
        }
    };
}

export const editAppRolePermissionAction = (params, cb) => {
    return async dispatch => {
        let { err, data } = await editAppRolePermission(params);
        if (!err) {
            cb && cb({ err, data });
        }
    };
}

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
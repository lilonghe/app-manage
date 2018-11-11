import { getUserAppRoleIds, editAppPermission, fetchApps, fetchApp, fetchAppRoles, addApp,editAppInfo, getAppPermissions, addAppPermission, addAppRole, editAppRole, editAppRolePermission, searchUser, addUser, userAddRole, userRemoveRole} from '../services/api';
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
            cb && cb({ err, data });
        }
    };
};

export const editAppAction = (params, cb) => {
    return async dispatch => {
        let { err, data } = await editAppInfo(params);
        if (!err) {
            cb && cb({ err, data });
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

export const editAppPermissionAction = (params, cb) => {
    return async dispatch => {
        let { err, data } = await editAppPermission(params);
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

export const searchUserAction = (params) => {
    return async dispatch => {
        let { err, data } = await searchUser(params);
        if (!err) {
            dispatch({
                type: actionTypes.onSearchUser,
                value: data
            });
        }
    };
}

export const addUserAction = (params, cb) => {
    return async dispatch => {
        let { err, data } = await addUser(params);
        if (!err) {
            cb && cb({ err, data });
        }
    };
}

export const changeShowChooseTargetApp = (show) => {
    return async dispatch => {
        dispatch({
            type: actionTypes.onChangeShowChooseTargetApp,
            value: show
        });
    };
};

export const fetchUserAppSchema = (appid) => {
    return async dispatch => {
        let { err, data } = await fetchAppRoles(appid);
        if (!err) {
            dispatch({
                type: actionTypes.onFetchUserAppSchema,
                value: { roles: data }
            });
        }
    };
};

export const changeShowEditUserPermission = (show) => {
    return async dispatch => {
        dispatch({
            type: actionTypes.toggleShowEditUserPermission,
            value: show
        });
    };
};

export const userAddRoleAction = (params, cb) => {
    return async dispatch => {
        let { err, data } = await userAddRole(params);
        if (!err) {
            dispatch({
                type: actionTypes.onAddUserRole,
                value: params.roleid
            });
            cb && cb({ err, data });
        }
    };
}


export const getUserAppRoleIdsAction = (params) => {
    return async dispatch => {
        let { err, data } = await getUserAppRoleIds(params);
        if (!err) {
            dispatch({
                type: actionTypes.onFetchUserAppRoles,
                value: { userAppRoles: data }
            });
        }
    };
}


export const userRemoveRoleAction = (params, cb) => {
    return async dispatch => {
        let { err, data } = await userRemoveRole(params);
        if (!err) {
            dispatch({
                type: actionTypes.onRemoveUserRole,
                value: params.roleid
            });
            cb && cb({ err, data });
        }
    };
}

export const  changeTargetUser = (userinfo) => {
    return async dispatch => {
        dispatch({
            type: actionTypes.onChangeTargetUser,
            value: userinfo
        });
    };
}
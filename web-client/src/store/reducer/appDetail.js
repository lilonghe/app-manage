import actionTypes from '../actionTypes';
let defaultState = {
    info: {},
    roles: [],
    appid: '',
    permissions: []
};

export const appDetail = (state=defaultState, action={}) => {
    switch (action.type) {
    case actionTypes.onFetchApp:
        return {...state, info: action.value};
    case actionTypes.onFetchAppRoles:
        return {...state, roles: action.value};
    case actionTypes.onFetchAppPermission:
        return {...state, permissions: action.value};
    case actionTypes.onChooseApp:
        return {...state, appid: action.value};
    case actionTypes.onRemoveAppPermission:
        const perms = state.permissions.filter(item => item.code != action.value);
        return {...state, permissions: perms}
    case actionTypes.onRemoveAppRole:
        const roles = state.roles.filter(item => item.code != action.value);
        return {...state, roles}
    default:
        return state;
    }
};

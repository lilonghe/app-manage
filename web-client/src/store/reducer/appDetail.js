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
    default:
        return state;
    }
};

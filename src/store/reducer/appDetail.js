import actionTypes from '../actionTypes';
let defaultState = {
    info: {},
    roles: []
};

export const appDetail = (state=defaultState, action={}) => {
    switch (action.type) {
    case actionTypes.onFetchApp:
        return {...state, info: action.value};
    case actionTypes.onFetchAppRoles:
        return {...state, roles: action.value};
    default:
        return state;
    }
};

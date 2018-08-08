import actionTypes from '../actionTypes';
let defaultState = {
    list: [],
    targetApp: {}
};

export const apps = (state=defaultState, action={}) => {
    switch (action.type) {
    case actionTypes.onFetchApps:
        return {...state, list: action.value};
    case actionTypes.onFetchApp:
        return {...state, targetApp: action.value};
    default:
        return state;
    }
};

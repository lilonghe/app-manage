import actionTypes from '../actionTypes';
let defaultState = {
    list: [],
    targetApp: {},
    
    showChooseTargetApp: false
};

export const apps = (state=defaultState, action={}) => {
    switch (action.type) {
    case actionTypes.onFetchApps:
        return {...state, list: action.value};
    case actionTypes.onFetchApp:
        return {...state, targetApp: action.value};
    case actionTypes.onChangeShowChooseTargetApp:
        return {...state, showChooseTargetApp: action.value}
    case actionTypes.onChooseApp:
        return {...state, targetApp: state.list.find(item => item.appid==action.value) || {}};
    default:
        return state;
    }
};

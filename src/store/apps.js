
let defaultState = {
    list: [],
    targetApp: {}
};

export const apps = (state=defaultState, action={}) => {
    switch (action.type) {
    case "onFetchApps":
        return {...state, list: action.value};
    case "onFetchApp":
        return {...state, targetApp: action.value};
    default:
        return state;
    }
};

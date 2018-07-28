
let defaultState = {
    list: []
};

export const apps = (state=defaultState, action={}) => {
    switch (action.type) {
    case "onFetchApps":
        return {...state, list: action.value};
    default:
        return state;
    }
};

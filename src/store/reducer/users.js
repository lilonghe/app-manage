import actionTypes from '../actionTypes';
let defaultState = {
    userList: [],
    totalUser: 0,
    targetUser: {}
};

export const users = (state=defaultState, action={}) => {
    switch (action.type) {
    case actionTypes.onSearchUser:
        return {...state, userList: action.value.users, totalUser: action.value.total};
    case actionTypes.onChangeTargetUser:
        return {...state, targetUser: action.value};
    default:
        return state;
    }
};

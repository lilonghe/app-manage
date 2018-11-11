import actionTypes from '../actionTypes';
let defaultState = {
    appSchema: {
        roles: [],
        permissions: []
    },
    userAppRoles: [],
    showEditUserPermission: false
};

export const userPermission = (state=defaultState, action={}) => {
    switch (action.type) {
    case actionTypes.toggleShowEditUserPermission:
        return {...state, showEditUserPermission: action.value};
    case actionTypes.onFetchUserAppSchema:
        return {...state, appSchema: {roles: action.value.roles}};
    case actionTypes.onFetchUserAppRoles:
        return {...state, appSchema: {userAppRoles: action.value.userAppRoles }}
    default:
        return state;
    }
};

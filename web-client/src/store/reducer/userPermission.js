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
        return {...state, appSchema: {...state.appSchema, roles: action.value.roles, permissions: action.value.permissions}};
    case actionTypes.onFetchUserAppRoles:
        return {...state, userAppRoles: action.value.userAppRoles }
    case actionTypes.onAddUserRole: 
        state.userAppRoles.push(action.value);
        return {...state};
    case actionTypes.onRemoveUserRole: 
        let roleId = action.value;
        let i = state.userAppRoles.findIndex(r => r == roleId);
        if (i!=-1) {
            return {...state, userAppRoles: [...state.userAppRoles.slice(0, i), ...state.userAppRoles.slice(i+1, state.userAppRoles.length)]}
        }
        return state;
    case actionTypes.onAddUserRole:
        return {...state, userAppRoles: [...state.userAppRoles, action.value]};
    default:
        return state;
    }
};

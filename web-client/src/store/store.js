import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { apps } from "./reducer/apps";
import { appDetail } from './reducer/appDetail';
import { users } from './reducer/users';
import { userPermission } from './reducer/userPermission';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(
    combineReducers({ apps, appDetail, users, userPermission }),
    /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
));

export default store;

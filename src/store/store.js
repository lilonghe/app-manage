import {createStore, combineReducers, applyMiddleware} from 'redux';
import { apps, fetchAppsAction} from "./apps";
import thunk from 'redux-thunk';

let store = createStore(
    combineReducers({ apps }),
    applyMiddleware(thunk)
)

export default store;

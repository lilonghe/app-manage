import {createStore, combineReducers, applyMiddleware} from 'redux';
import { apps } from "./reducer/apps";
import { appDetail } from './reducer/appDetail';
import thunk from 'redux-thunk';

let store = createStore(
    combineReducers({ apps, appDetail }),
    applyMiddleware(thunk)
);

export default store;

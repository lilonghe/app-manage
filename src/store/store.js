import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { apps } from "./reducer/apps";
import { appDetail } from './reducer/appDetail';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(
    combineReducers({ apps, appDetail }),
    /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
));

export default store;

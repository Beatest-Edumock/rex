/*
All setup related to redux is done here.

This like setting the initial state, combining reducers,etc.
 */

import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {addUserAC} from './ActionCreators/User-ActionCreator'

import userReducer from './reducers/User/User-Reducers'
import {getUserDetailsApi} from "../_Api/User";
import React from 'react';
import {testOverviewReducer} from "./reducers/Tests/TestAttempts-Reducers";


function initStore() {


    const combined = combineReducers(
        {
            user: userReducer, //user object,result of get user details api
            testOverview: testOverviewReducer //an array of test attempt rows , result of get test attempt overview endpoint
        }
    );


    let middleware;


    if (process.env.NODE_ENV !== 'production') {
        // const {whyDidYouUpdate} = require('why-did-you-update');
        // whyDidYouUpdate(React);
        middleware = composeWithDevTools(applyMiddleware(require('redux-immutable-state-invariant').default(), thunk))
    }
    else {
        middleware = applyMiddleware(thunk);

    }


    const store = createStore(combined, middleware);


    getUserDetailsApi().then(({data}) => {
            store.dispatch(addUserAC(data));
        }
    ).catch(() => {
        store.dispatch(addUserAC(null));
    });


    return store;
}


export {initStore};

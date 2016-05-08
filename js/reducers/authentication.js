'use strict';

import jwtDecode from 'jwt-decode';
import { LOGIN } from './../constants';

const initialState = {
    token: null,
    user: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN.REQUEST:
            return Object.assign({}, state, {
                isAuthenticating: true,
                statusText: null
            });
        case LOGIN.SUCCESS:
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: true,
                token: action.payload.token,
                user: jwtDecode(action.payload.token)._doc,
                statusText: action.payload.message
            });
        case LOGIN.FAILURE:
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: false,
                token: null,
                user: null,
                statusText: action.payload.message
            });
        case LOGIN.LOGOUT:
            return Object.assign({}, state, {
                isAuthenticated: false,
                token: null,
                user: null,
                statusText: action.payload.message
            });
        default:
            return state;
    }
};

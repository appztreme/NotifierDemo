'use strict';

import { LOGIN } from './../constants';

export function loginRequest(email, pwd) {
    console.log('LoginRequest', email + ' ' + pwd);
    return {
        type: LOGIN.REQUEST,
        payload: {
            email: email,
            password: pwd
        }
    };
};

export function loginSuccess(token, message) {
    console.log('LoginSuccess', message);
    return {
        type: LOGIN.SUCCESS,
        payload: {
            token: token,
            message: message
        }
    };
};

export function loginFailure(message) {
    console.log('LoginFailure', message);
    return {
        type: LOGIN.FAILURE,
        payload: {
            message: message
        }
    };
};

export function logout(message) {
    return {
        type: LOGIN.LOGOUT,
        payload: {
            message: message
        }
    };
};

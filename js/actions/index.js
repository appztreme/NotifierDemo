'use strict';

import { LOGIN } from './../constants';

export function loginRequest(email, pwd) {
    return {
        type: LOGIN.REQUEST,
        payload: {
            email: email,
            password: pwd
        }
    };
};

export function loginSuccess(token, message) {
    return {
        type: LOGIN.SUCCESS,
        payload: {
            token: token,
            message: message
        }
    };
};

export function loginFailure(message) {
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

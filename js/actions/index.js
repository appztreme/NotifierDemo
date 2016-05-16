import { LOGIN, NOTIFICATION } from './../constants';

export function loginRequest(email, pwd) {
    console.log('LoginRequest', `${email} ${pwd}`);
    return {
        type: LOGIN.REQUEST,
        payload: {
            email,
            password: pwd,
        },
    };
}

export function loginSuccess(token, message) {
    console.log('LoginSuccess', message);
    return {
        type: LOGIN.SUCCESS,
        payload: {
            token,
            message,
        },
    };
}

export function loginFailure(message) {
    console.log('LoginFailure', message);
    return {
        type: LOGIN.FAILURE,
        payload: {
            message,
        },
    };
}

export function logout(message) {
    return {
        type: LOGIN.LOGOUT,
        payload: {
            message,
        },
    };
}

export function loadNotifications(notifications) {
    console.log('ACTION: LoadNotifications', notifications);
    return {
        type: NOTIFICATION.LOAD,
        payload: {
            notifications,
        },
    };
}

export function newNotification(notification) {
    console.log('ACTION: NewNotification', notification);
    return {
        type: NOTIFICATION.NEW,
        payload: {
            notification,
        },
    };
}

export function acceptNotification(id) {
    console.log('ACTION: AcceptNotification', id);
    return {
        type: NOTIFICATION.ACCEPT,
        payload: {
            id,
        },
    };
}

export function declineNotification(id) {
    console.log('ACTION: declineNotification', id);
    return {
        type: NOTIFICATION.DECLINE,
        payload: {
            id,
        },
    };
}

export function cleanNotifications(date) {
    console.log('ACTION: cleanNotification', date);
    return {
        type: NOTIFICATION.CLEAN,
        payload: {
            date,
        },
    };
}

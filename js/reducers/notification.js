import { NOTIFICATION } from './../constants';

const initialNotificationsState = {
    newCount: 0,
    notifications: [],
};

const initialNotificationState = {
    title: '',
    message: '',
    date: new Date(),
    accepted: false,
    read: false,
};

export default (state = initialNotificationsState, action) => {
    switch (action.type) {
    case NOTIFICATION.NEW:
        console.log('RED new notification', action);
        return {
            newCount: state.newCount + 1,
            notifications: [notification(undefined, action), ...state.notifications],
        };
    case NOTIFICATION.CLEAN:
        console.log("RED CLEAN", action);
        const filtered = state.notifications.filter(val => val.date >= action.date);
        return {
            newCount: filtered.filter(val => !val.read).length,
            notifications: filtered,
        };
    default:
        return state;
    }
};

const notification = (state = initialNotificationState, action) => {
    console.log("single red", action);
    switch (action.type) {
    case NOTIFICATION.LOAD:
        return action.payload;
    case NOTIFICATION.NEW:
        console.log("Single reducer called", action);
        return Object.assign({}, initialNotificationState, action.payload.notification);
    default:
        return state;
    }
};

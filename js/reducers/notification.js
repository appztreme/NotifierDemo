import { NOTIFICATION } from './../constants';

const initialNotificationsState = {
    newCount: 0,
    notifications: [],
    acceptedNotifications: []
};

const initialNotificationState = {
    title: '',
    message: '',
    date: new Date(),
    accepted: false,
    read: false,
};

const notification = (state = initialNotificationState, action) => {
    switch (action.type) {
    case NOTIFICATION.LOAD:
        return action.payload;
    case NOTIFICATION.NEW:
        return Object.assign({}, initialNotificationState, action.payload.notification);
    case NOTIFICATION.ACCEPT:
        return Object.assign({}, state, { read: true, accepted: true });
    case NOTIFICATION.DECLINE:
        return Object.assign({}, state, { read: true, accepted: false });
    default:
        return state;
    }
};

export default (state = initialNotificationsState, action) => {
    switch (action.type) {
    case NOTIFICATION.NEW:
        console.log('RED new notification', action);
        return {
            newCount: state.newCount + 1,
            notifications: [notification(undefined, action), ...state.notifications],
            acceptedNotifications: [...state.acceptedNotifications],
        };
    case NOTIFICATION.CLEAN:
        console.log('RED CLEAN', action);
        const filtered = state.notifications.filter(val => val.date >= action.date);
        return {
            newCount: filtered.filter(val => !val.read).length,
            notifications: filtered,
            acceptedNotifications: [...state.acceptedNotifications],
        };
    case NOTIFICATION.ACCEPT:
        console.log('RED ACCEPT', action);
        const filteredAccept = state.notifications.filter(val => val.id !== action.payload.id);
        const selectedAccept = state.notifications.find(val => val.id === action.payload.id);
        return {
            newCount: selectedAccept && selectedAccept.read ? state.newCount : state.newCount - 1,
            notifications: filteredAccept,
            acceptedNotifications: [notification(selectedAccept, action),
                ...state.acceptedNotifications],
        };
    case NOTIFICATION.DECLINE:
        console.log('RED DECLINE', action);
        const filteredDecline = state.notifications.filter(val => val.id !== action.payload.id);
        const selectedDecline = state.notifications.find(val => val.id === action.payload.id);
        notification(selectedDecline, action);
        return {
            newCount: selectedDecline && selectedDecline.read ? state.newCount : state.newCount - 1,
            notifications: filteredDecline,
            acceptedNotifications: [...state.acceptedNotifications],
        };
    default:
        return state;
    }
};

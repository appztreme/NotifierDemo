import { NOTIFICATION } from './../constants';

const initialState = {
    message: '',
    date: new Date(),
    accepted: false,
};

export default (state = [], action) => {
    switch (action.type) {
    case NOTIFICATION.NEW:
        console.log('RED new notification', action);
        return [notification(undefined, action), ...state];
    case NOTIFICATION.CLEAN:
        return state.filter(val => val.date >= action.date);
    default:
        return state;
    }
};

const notification = (state = initialState, action) => {
    console.log("single red", action);
    switch (action.type) {
    case NOTIFICATION.LOAD:
        return action.payload;
    case NOTIFICATION.NEW:
        console.log("Single reducer called", action);
        return Object.assign({}, initialState, action.payload.notification);
    default:
        return state;
    }
};

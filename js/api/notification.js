import react from 'react-native';
window.navigator.userAgent = 'react-native';
import io from 'socket.io-client/socket.io';
const BASE_URL = 'http://localhost:3000/';

class NotificationService {
    constructor(onMessageReceived) {
        const socket = io.connect(BASE_URL, {
            'reconnection delay': 0,
            'reopen delay': 0,
            'force new connection': true,
            jsonp: false,
        });
        socket.on('connect', () => {
            console.log('worked...');
        });
        socket.on('disconnect', () => {
            console.log('disconnected...');
        });
        socket.on('error', (err) => {
            console.log(err);
        });
        socket.on('notification', (msg) => {
            console.log(msg);
            onMessageReceived(msg);
        });
    }
}

export default NotificationService;

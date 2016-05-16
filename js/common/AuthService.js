import { AsyncStorage } from 'react-native';
import _ from 'lodash';

const USER_KEY = 'user';
const TOKEN_KEY = 'authToken';

class AuthService {
    getAuthInfo(cb) {
        AsyncStorage.multiGet([USER_KEY, TOKEN_KEY], (err, value) => {
            if (err) return cb(err);
            if (!value) return cb();
            const zippo = _.zipObject(value);
            if (!zippo[TOKEN_KEY]) return cb();
            const authInfo = {
                token: zippo[TOKEN_KEY],
                user: JSON.parse(zippo[USER_KEY]),
            };
            console.log(authInfo);
            return cb(null, authInfo);
        });
    }

    login(email, pwd, cb) {
        fetch('http://localhost:3000/api/authenticate', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userEmail: email,
                                   password: pwd }),
        })
        .then(res => res.json())
        .then(resp => {
            if (!resp.success) {
                throw resp.message;
            }
            AsyncStorage.multiSet([
                [USER_KEY, JSON.stringify({ email, password: pwd })],
                [TOKEN_KEY, resp.token],
            ], (err) => {
                if (err) throw err;
                console.log(resp);
                cb(resp);
            });
        })
        .catch(err => cb(err));
    }
}

export default new AuthService();

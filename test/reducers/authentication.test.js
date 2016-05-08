'use strict';

import expect from 'expect';
import { LOGIN } from './../../js/constants';
import * as actions from './../../js/actions';
import reducer from './../../js/reducers/authentication';

const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7Imhhc2hlZFBhc3N3b3JkIjoiaW5pdCIsInVzZXJFbWFpbCI6ImluaXQiLCJ1c2VyVGVsIjoiaW5pdCIsImxhc3ROYW1lIjoiaW5pdCIsImZpcnN0TmFtZSI6ImluaXQiLCJyb2xlcyI6ImluaXQiLCJzYWx0IjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7InJvbGVzIjp0cnVlLCJzYWx0Ijp0cnVlLCJoYXNoZWRQYXNzd29yZCI6dHJ1ZSwidXNlckVtYWlsIjp0cnVlLCJ1c2VyVGVsIjp0cnVlLCJsYXN0TmFtZSI6dHJ1ZSwiZmlyc3ROYW1lIjp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsicm9sZXMiOltdLCJzYWx0IjoiaFVTeEFnc2dSd0VwZldmUzJtNVNLc3lqT0pZV3JnMjFxV25lYlVlcUloYm5kZlZsaldidldMajY4SGdtTDJ1Uk8waTBjNS9DWUZZTTh0cklLUHlnY0dFa0xtTlI2cXhTM3BJTlVXMGlJMDVKa1VrcWJvZEIvV1NTbXN3KzhIbUV1NjdWYytIaG82ZnBEd1hzQ0lkNE43aThjRCtQdmhKbVJ6eWs1V3ZUdzFrPSIsImhhc2hlZFBhc3N3b3JkIjoiNzQyMmE5OGJkNzgzZjYzYTllMjQyYWRkZTlkMjBmZmY1ZDIwYWQ3ZCIsInVzZXJFbWFpbCI6InVzZXJAZ21haWwuY29tIiwidXNlclRlbCI6IjEyMzQvNTY3ODkiLCJsYXN0TmFtZSI6InVzZXJMYXN0IiwiZmlyc3ROYW1lIjoidXNlckZpcnN0IiwiX2lkIjoiMTExMTExMTExMTExMTExMTExMTEwMDAxIn0sIl9wcmVzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltudWxsLG51bGxdfSwiX3Bvc3RzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltdfSwiaWF0IjoxNDYyMTMwNjE2LCJleHAiOjE0NjIzMDM0MTZ9.ennKmVItqrRFuJbfsZWEvcM2ZBXog2r0EZKv3YoZhNA";
const userObj =  {
    _id: '111111111111111111110001',
    firstName: 'userFirst',
    lastName: 'userLast',
    userEmail: 'user@gmail.com',
    userTel: '1234/56789',
    roles: []
};

describe('REDUCERS', () => {
    describe('Authentication', () => {
        it('loginRequest action mutates state', () => {
            const newState = reducer(null, actions.loginRequest());
            expect(newState.isAuthenticating).toEqual(true);
            expect(newState.statusText).toEqual(null);
        });
        it('loginSuccess action mutates state', () => {
            const newState = reducer(null, actions.loginSuccess(userToken, 'success'));
            expect(newState.isAuthenticating).toEqual(false);
            expect(newState.isAuthenticated).toEqual(true);
            expect(newState.token).toEqual(userToken);
            expect(newState.user._id).toEqual(userObj._id);
            expect(newState.user.firstName).toEqual(userObj.firstName);
            expect(newState.user.lastName).toEqual(userObj.lastName);
            expect(newState.user.userEmail).toEqual(userObj.userEmail);
            expect(newState.user.userTel).toEqual(userObj.userTel);
            expect(newState.user.roles).toEqual(userObj.roles);
            expect(newState.statusText).toEqual('success');
        });
        it('loginFailure action mutates state', () => {
            const newState = reducer(null, actions.loginFailure('error'));
            expect(newState.isAuthenticating).toEqual(false);
            expect(newState.isAuthenticated).toEqual(false);
            expect(newState.token).toEqual(null);
            expect(newState.user).toEqual(null);
            expect(newState.statusText).toEqual('error');
        });
        it('logout action mutates state', () => {
            const newState = reducer(null, actions.logout('logout'));

        });
    });
});

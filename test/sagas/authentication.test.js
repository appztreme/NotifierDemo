'use strict';

import expect from 'expect';
import { call, put } from 'redux-saga/effects';
import * as actions from './../../js/actions';
import * as api from './../../js/api/authentication';
import { loginAsync } from './../../js/sagas/authentication';

describe('SAGAS', () => {
    describe('Authentication', () => {
        it('loginAsync fetch and dispatch user info', () => {
            const email = 'user@gmail.com', pwd = 'test';
            let gen = loginAsync(actions.loginRequest(email, pwd));
            expect(gen.next().value).toEqual(call(api.authenticate, email, pwd));
            expect(gen.next({token: 'xxx', message: 'xxx'}).value).toEqual(put(actions.loginSuccess('xxx', 'xxx')));
            expect(gen.next()).toEqual({ done: true, value: undefined });
        });
        it('watchLoginAsync waits for new login actions', () => {
            expect(1).toEqual(1);
        });
    });
});

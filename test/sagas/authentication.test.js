'use strict';

import expect from 'expect';
import { call, put } from 'redux-saga/effects';
import * as actions from './../../js/actions';
import * as api from './../../js/api/authentication';
import { loginAsync } from './../../js/sagas/authentication';

describe('SAGAS', () => {
    describe('Authentication', () => {
        it('test', () => {
            const email = 'user@gmail.com', pwd = 'test';
            let gen = loginAsync(actions.loginRequest(email, pwd));
            expect(gen.next().value).toEqual(call(api.authenticate, email, pwd));
            console.log(gen.next());
            //expect(gen.next()).toEqual({ done: true, value: undefined });
        });
    });
});
